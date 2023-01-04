from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_check(form, field):
    # Checking if passwords match
    password = form.password.data
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError('Passwords do not match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(max=20, message="Username must be shorter than 20 characters."), Length(min=3, message="Username must be longer than 3 characters.")])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired(), password_check, Length(max=20, message="Password must be shorter than 20 characters."), Length(min=3, message="Password must be longer than 3 characters.")])
