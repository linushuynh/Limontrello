from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db, CardList
# from ..forms.board_form import CreateBoardForm, UpdateBoardForm
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
