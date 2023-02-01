from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length


class ListForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=20, message="List name cannot be longer than 20 characters.")])
    board_id = IntegerField('board_id')
    card_order = StringField('card_order')
    color = StringField('color')
