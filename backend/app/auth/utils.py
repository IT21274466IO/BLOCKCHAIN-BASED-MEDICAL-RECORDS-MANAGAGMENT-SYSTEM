import jwt
import random
import string
from datetime import datetime, timedelta
from flask import current_app

def generate_jwt_token(email):
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return token


def generate_reset_token(length=5):
    return ''.join(random.choices(string.digits, k=length))
