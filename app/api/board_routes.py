from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, db, CardList
from ..forms.board_form import CreateBoardForm, UpdateBoardForm
from .auth_routes import validation_errors_to_error_messages, authorized

board_routes = Blueprint('boards', __name__)


@board_routes.route('', methods=["POST"])
@login_required
def create_board():
    """
    Create a new board for the user and append 3 lists for the new board to start with
    """
    form = CreateBoardForm()
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
                board_id = new_board.id
            )
            new_list2 = CardList(
                name = "In Progress",
                board_id = new_board.id
            )
            new_list3 = CardList(
                name = "Complete",
                board_id = new_board.id
            )
            new_board.lists.append(new_list1)
            new_board.lists.append(new_list2)
            new_board.lists.append(new_list3)
            db.session.add(new_board)
            db.session.commit()

        return new_board.to_dict()

    return {'error': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:board_id>', methods=["PUT"])
@login_required
def update_board(board_id):
    """
    Find an existing board by id and updates it with form data
    """
    form = UpdateBoardForm()
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
