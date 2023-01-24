from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class CardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    position = IntegerField('position')
    list_id = IntegerField('list_id', validators=[DataRequired()])
