from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length

def name_check(form, field):
    name = field.data
    if len(name) > 20:
        raise ValidationError('Name of the board must be less than 20 characters')


class BoardForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_check])
    background = StringField('Background')
    private = BooleanField('Private')
