from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, validators

class LoginForm(FlaskForm):
    nickname = StringField('Nickname', [validators.DataRequired()])
    password = PasswordField('password', [validators.DataRequired()])
    submit = SubmitField('Log in')

class SignupForm(LoginForm):
    email = StringField("Email", [validators.DataRequired(),
validators.Email()])
    submit = SubmitField("Sign up")