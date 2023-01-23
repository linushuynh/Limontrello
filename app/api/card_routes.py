from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db, CardList
from ..forms.card_form import CardForm
from .auth_routes import validation_errors_to_error_messages, authorized

card_routes = Blueprint('cards', __name__)


@card_routes.route('', methods=["POST"])
@login_required
def create_card():
    """
    Creates a new card using the card_form data
    """
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_card = Card(
            title = data['title'],
            description = data['description'],
            position = data['position'],
            list_id = data['list_id']
        )
        db.session.add(new_card)
        db.session.commit()
        return new_card.to_dict()

    return { 'errors' : validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:card_id>", methods=["PUT"])
@login_required
def update_card(card_id):
    """
    Queries for card by id then updates with form information
    """
    card = Card.query.get(card_id)

    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not card:
        return { "error": "Card couldn't be found" }, 404

    if card and form.validate_on_submit():
        data = form.data
        card.title = data["title"]
        card.description = data["description"]
        card.position = data["position"]
        card.list_id = data["list_id"]

        db.session.commit()
        return card.to_dict()
    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@card_routes.route("/<int:card_id>", methods=["DELETE"])
@login_required
def delete_card(card_id):
    """
    Queries for the card by id then deletes it
    """
    card = Card.query.get(card_id)

    if not card:
        return { "error": "Card couldn't be found" }, 404

    db.session.delete(card)
    db.session.commit()

    return { "message": "Successfully deleted card"}
