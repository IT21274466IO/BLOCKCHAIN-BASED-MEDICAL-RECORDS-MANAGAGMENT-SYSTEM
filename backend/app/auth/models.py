from datetime import datetime, timedelta
from .. import mongo  # Import mongo from __init__.py
from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app


class Patient:
    def __init__(self, fullname, email, password, reset_token=None, profile_image=None, mobile=None, is_hashed=False):
        self.fullname = fullname
        self.email = email
        self.password = generate_password_hash(password) if not is_hashed else password
        self.reset_token = reset_token
        self.profile_image = profile_image
        self.mobile = mobile

    def save(self):
        user_data = {
            'fullname': self.fullname,
            'email': self.email,
            'password': self.password,
            'reset_token': self.reset_token,
            'profile_image': self.profile_image,
            'mobile': self.mobile
        }
        mongo.db.users.update_one({'email': self.email}, {'$set': user_data}, upsert=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def delete(self):
        result = mongo.db.users.delete_one({'email': self.email})
        return result.deleted_count > 0
    

    @classmethod
    def find_by_email(cls, email):
        user_data = mongo.db.users.find_one({'email': email})
        if user_data:
            return cls(
                fullname=user_data['fullname'],
                email=user_data['email'],
                password=user_data['password'],
                reset_token=user_data.get('reset_token'),
                profile_image=user_data.get('profile_image'),
                mobile=user_data.get('mobile'),
                is_hashed=True
            )
        return None
