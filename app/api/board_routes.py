from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Board, db, CardList
from ..forms.board_form import CreateBoardForm, UpdateBoardForm
from .auth_routes import validation_errors_to_error_messages, authorized

board_routes = Blueprint('boards', __name__)


@board_routes.route('', methods=["POST"])
# @login_required
def create_board():
    """
    Create a new board for the user
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

        # print("newboard after commit",new_board)

        # Add 3 default lists to newly created boards
        # new_posted_board = new_board.to_dict()
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
            # print("newboard after newlists appended",new_board)
            db.session.add(new_board)
            db.session.commit()

        return new_board.to_dict()

    return {'error': validation_errors_to_error_messages(form.errors)}, 401


@board_routes.route('/<int:board_id>', methods=["PUT"])
# @login_required
def update_board(board_id):
    """
    Edit an existing board
    """
    form = UpdateBoardForm()
    form["csrf_token"].data = request.cookies["csurf_token"]

    if form.validate_on_submit():
        data = form.data
    return
