import json

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Card, db, CardList
from ..forms.card_form import CardForm
from ..utils.rich_text import sanitize_rich_text
from .auth_routes import validation_errors_to_error_messages, authorized

card_routes = Blueprint('cards', __name__)


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
            description = sanitize_rich_text(data['description']),
            list_id = data['list_id']
        )
        db.session.add(new_card)
        db.session.commit()

        target_list = CardList.query.get(data['list_id'])
        if target_list:
            order = _parse_order(target_list.card_order)
            if new_card.id not in order:
                order.append(new_card.id)
            target_list.card_order = json.dumps(order)
            db.session.commit()

        return new_card.to_dict()

    return { 'errors' : validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route("/<int:card_id>", methods=["PUT"])
@login_required
def update_card(card_id):
    """
    Queries for card by id then updates with the JSON payload information.
    """
    card = Card.query.get(card_id)
    payload = request.get_json(silent=True) or {}

    if not card:
        return { "error": "Card couldn't be found" }, 404

    title = payload.get("title")
    description = payload.get("description", "")
    target_list_id = payload.get("list_id")

    if not title:
        return { "errors": ["title is required"] }, 400

    if not target_list_id:
        return { "errors": ["list_id is required"] }, 400

    source_list = card.list
    target_list = CardList.query.get(target_list_id)

    card.title = title
    card.description = sanitize_rich_text(description)
    card.list_id = target_list_id

    source_order_from_payload = payload.get("source_card_order")
    target_order_from_payload = payload.get("target_card_order") or payload.get("card_order")

    if source_list and source_list.id != target_list_id and source_order_from_payload is not None:
        source_list.card_order = json.dumps(_parse_order(source_order_from_payload))
    elif source_list and source_list.id != target_list_id:
        source_order = _parse_order(source_list.card_order)
        source_list.card_order = json.dumps(_remove_id(source_order, card_id))

    if target_list:
        if target_order_from_payload is not None:
            target_list.card_order = json.dumps(_parse_order(target_order_from_payload))
        elif card_id not in _parse_order(target_list.card_order):
            target_order = _parse_order(target_list.card_order)
            target_order.append(card_id)
            target_list.card_order = json.dumps(target_order)

    db.session.commit()
    return card.to_dict()


@card_routes.route("/<int:card_id>", methods=["DELETE"])
@login_required
def delete_card(card_id):
    """
    Queries for the card by id then deletes it
    """
    card = Card.query.get(card_id)

    if not card:
        return { "error": "Card couldn't be found" }, 404

    source_list = card.list
    if source_list:
        source_order = _parse_order(source_list.card_order)
        source_list.card_order = json.dumps(_remove_id(source_order, card_id))

    db.session.delete(card)
    db.session.commit()

    return { "message": "Successfully deleted card" }
