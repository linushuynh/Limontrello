from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Comment, db
from ..forms import CommentForm
from .auth_routes import validation_errors_to_error_messages, authorized

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('', methods=["POST"])
@login_required
def create_comment():
    """
    Creates a new comment using data from CommentForm
    """
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            content = data['content'],
            user_id = current_user.id,
            card_id = data['card_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return { 'errors' : validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def update_comment(comment_id):
    """
    Queries for comment by id and then updates information using form data
    """
    comment = Comment.query.get(comment_id)

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not comment:
        return { "error": "Card couldn't be found" }, 404

    if not authorized(comment.user_id):
        return { "error": "You cannot edit other people's comments" }

    if form.validate_on_submit():
        data = form.data
        comment.content = data['content']

        db.session.commit()
        return comment.to_dict()

    return { "errors": validation_errors_to_error_messages(form.errors) }, 401


@comment_routes.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    """
    Queries for the comment by id then deletes it
    """
    comment = Comment.query.get(comment_id)

    if not comment:
        return { "error": "Card couldn't be found" }, 404

    if not authorized(comment.user_id):
        return { "error": "You cannot delete other people's comments" }

    db.session.delete(comment)
    db.session.commit()

    return { "message": "Successfully deleted comment" }
