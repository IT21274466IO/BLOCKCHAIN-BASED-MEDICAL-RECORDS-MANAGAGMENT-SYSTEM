from .. import mongo
from werkzeug.security import generate_password_hash, check_password_hash

class Doctor:
    def __init__(self, fullname, email, specialization, hospital, password=None, mobile=None, profile_image=None, is_hashed=False):
        self.fullname = fullname
        self.email = email
        self.specialization = specialization
        self.hospital = hospital
        self.password = generate_password_hash(password) if password and not is_hashed else password
        self.mobile = mobile
        self.profile_image = profile_image

    def save(self):
        data = {
            'fullname': self.fullname,
            'email': self.email,
            'specialization': self.specialization,
            'hospital': self.hospital,
            'password': self.password,
            'mobile': self.mobile,
            'profile_image': self.profile_image
        }
        mongo.db.doctors.update_one({'email': self.email}, {'$set': data}, upsert=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def find_by_email(cls, email):
        doc = mongo.db.doctors.find_one({'email': email})
        if doc:
            return cls(
                fullname=doc['fullname'],
                email=doc['email'],
                specialization=doc['specialization'],
                hospital=doc['hospital'],
                password=doc.get('password'),
                mobile=doc.get('mobile'),
                profile_image=doc.get('profile_image'),
                is_hashed=True
            )
        return None

    @classmethod
    def get_all(cls):
        return list(mongo.db.doctors.find())



@classmethod
def find_by_name(cls, name):
    doc = mongo.db.doctors.find_one({'fullname': name})
    if doc:
        return cls(
            fullname=doc['fullname'],
            email=doc['email'],
            specialization=doc['specialization'],
            hospital=doc['hospital'],
            password=doc.get('password'),
            mobile=doc.get('mobile'),
            profile_image=doc.get('profile_image'),
            is_hashed=True
        )
    return None