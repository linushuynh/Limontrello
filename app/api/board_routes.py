import json

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, db, CardList
from ..forms.board_form import BoardForm
from .auth_routes import validation_errors_to_error_messages, authorized

board_routes = Blueprint('boards', __name__)


def _parse_order(value):
    if isinstance(value, list):
        return value
    if not value:
        return []
    try:
        parsed = json.loads(value)
        return parsed if isinstance(parsed, list) else []
    except Exception:
        return []


def _remove_id(order, target_id):
    return [item for item in order if item != target_id]


@board_routes.route('', methods=["GET"])
@login_required
def get_user_boards():
    """
    Get all boards
    """
    current_id = current_user.id

    boards = Board.query.filter(Board.user_id == current_id).all()

    return {
        'boards': [board.to_dict() for board in boards]
        }


@board_routes.route('', methods=["POST"])
@login_required
def create_board():
    """
    Create a new board for the user and append 3 lists for the new board to start with
    """
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_board = Board(
            name = data["name"],
            background = data["background"],
            private = data["private"],
            user_id = current_user.id
        )
        db.session.add(new_board)
        db.session.commit()

        # Add 3 default lists to newly created boards
        if len(new_board.lists) < 1:
            new_list1 = CardList(
                name = "To-Do",
                board_id = new_board.id,
                card_order = '[]'
            )
            new_list2 = CardList(
                name = "In Progress",
                board_id = new_board.id,
                card_order = '[]'
            )
            new_list3 = CardList(
                name = "Complete",
                board_id = new_board.id,
                card_order = '[]'
            )
            new_board.lists.append(new_list1)
            new_board.lists.append(new_list2)
            new_board.lists.append(new_list3)
            db.session.add(new_board)
            db.session.commit()

            new_board.list_order = json.dumps([new_list1.id, new_list2.id, new_list3.id])
            db.session.commit()

        return new_board.to_dict()

    return {'error': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:board_id>', methods=["PUT"])
@login_required
def update_board(board_id):
    """
    Find an existing board by id and updates it with form data
    """
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    board = Board.query.get(board_id)

    if not board:
        return { "error": "Board couldn't be found" }

    if not authorized(board.user_id):
        return { "error": "You do not own this board" }

    if board and form.validate_on_submit():
        data = form.data
        board.name = data["name"]
        board.background = data["background"]
        board.private = data["private"]
        if data.get('list_order') is not None:
            board.list_order = json.dumps(_parse_order(data['list_order']))
        db.session.commit()

        return board.to_dict()
    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@board_routes.route('/<int:board_id>', methods=["DELETE"])
@login_required
def delete_board(board_id):
    """
    Finds a board by id and deletes it
    """
    board = Board.query.get(board_id)

    if not board:
        return { "error": "Board couldn't be found" }

    if not authorized(board.user_id):
        return { "error": "You do not own this board" }

    db.session.delete(board)
    db.session.commit()
    return { "message": "Successfully deleted" }
