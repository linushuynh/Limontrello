from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db, CardList
from ..forms import ListForm
from .auth_routes import validation_errors_to_error_messages, authorized

list_routes = Blueprint('lists', __name__)


@list_routes.route("/<int:list_id>/cards")
@login_required
def get_cards(list_id):
    """
    Queries and returns all cards for a given list
    """

    #(Eager) Option 1: Query for list and the list will have cards appended already
    card_list = CardList.query.get(list_id)
    cards = card_list['cards']

    #(Lazy) Option 2: Query for cards and filter_by(list_id=list_id)
    # cards = Card.query.filter_by(list_id=list_id).all()

    if not cards:
        return { 'errors': 'There were no cards in this list' }

    return { 'cards': cards }


@list_routes.route('', methods=["POST"])
@login_required
def create_list():
    """
    Creates a new list using form data
    """
    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_list = CardList(
            name = data['name'],
            board_id = data['board_id']
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()

    return { 'errors' : validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:list_id>/edit', methods=["PUT"])
@login_required
def update_list(list_id):
    """
    Update list with form data at the given list id
    """
    form = ListForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    selected_list = CardList.query.get(list_id)

    if not selected_list:
        return { "error": "List couldn't be found" }, 404

    if form.validate_on_submit():
        data = form.data
        selected_list.name = data['name']

        db.session.commit()
        return selected_list.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@list_routes.route('/<int:list_id>/delete', methods=['DELETE'])
@login_required
def delete_list(list_id):
    """
    Queries for a list then deletes it
    """
    selected_list = CardList.query.get(list_id)
    if not selected_list:
        return { "error": "List couldn't be found" }, 404

    db.session.delete(selected_list)
    db.session.commit()

    return { "message": "Successfully deleted"}, 200
