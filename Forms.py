from wtforms import Form, StringField, RadioField, SelectField, TextAreaField, IntegerField, validators
from wtforms.fields.html5 import EmailField


class CreateUserForm(Form):
    first_name = StringField('First Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    last_name = StringField('Last Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    gender = SelectField('Gender', [validators.DataRequired()], choices=['Select', 'Male', 'Female'], default='')
    phone = IntegerField('Phone Number', [validators.NumberRange(min=11111111, max=99999999), validators.DataRequired()])
    address = StringField('Address', [validators.Length(min=1, max=150), validators.DataRequired()])
    password = StringField('Password', [validators.Length(min=10, max=150), validators.DataRequired()])
    email = EmailField('Email', [validators.DataRequired()])
