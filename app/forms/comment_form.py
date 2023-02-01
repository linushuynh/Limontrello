from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length


class CommentForm(FlaskForm):
    content = StringField('content', Length(max=255,message="Comment cannot be longer than 255 characters"))
    user_id = IntegerField('user_id')
    card_id = IntegerField('card_id')
