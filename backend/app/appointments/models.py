
from .. import mongo 
from datetime import datetime
from flask import current_app


class Appointment:

    @staticmethod
    def create(data):
        data['created_at'] = datetime.utcnow()
        mongo.db.Appointments.insert_one(data)
        return data

    @staticmethod
    def find_by_patient(email):
        return list(mongo.db.Appointments.find({'patient_email': email}, {'_id': 0}))

    @staticmethod
    def find_by_doctor(email):
        return list(mongo.db.Appointments.find({'doctor_email': email}, {'_id': 0}))

    @staticmethod
    def get_doctor_availability(email):
        return list(mongo.db['doctor-availability'].find({'doctor_email': email}, {'_id': 0}))

    @staticmethod
    def update_doctor_availability(email, available_dates):
        record = {
            'doctor_email': email,
            'available_dates': available_dates,
            'updated_at': datetime.utcnow()
        }
        mongo.db['doctor-availability'].update_one(
            {'doctor_email': email},
            {'$set': record},
            upsert=True
        )
        return record