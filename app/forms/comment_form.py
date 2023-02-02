from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class CommentForm(FlaskForm):
    content = StringField('content')
    card_id = IntegerField('card_id')
