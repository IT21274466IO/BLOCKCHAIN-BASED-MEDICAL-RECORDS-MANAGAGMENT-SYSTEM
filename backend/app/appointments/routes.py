from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from .. import mongo 
from app.doctors.models import Doctor

appointments_bp = Blueprint('appointments', __name__)

# Create Appointment
@appointments_bp.route('/create', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.json
    patient_email = get_jwt_identity()

    required_fields = ['doctor_email', 'appointment_date']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

    doctor = Doctor.find_by_email(data['doctor_email'])
    if not doctor:
        return jsonify({'error': 'Doctor not found'}), 404

    appointment = {
        'patient_email': patient_email,
        'doctor_email': data['doctor_email'],
        'doctor_name': doctor.fullname,
        'specialty': doctor.specialization,
        'hospital': doctor.hospital,
        'contact': doctor.mobile,
        'appointment_date': appointment_date,
        'created_at': datetime.utcnow()
    }

    mongo.db.Appointments.insert_one(appointment)

    return jsonify({'message': 'Appointment created successfully', 'appointment': appointment}), 201


# Get all appointments for the logged-in patient
@appointments_bp.route('/my-appointments', methods=['GET'])
@jwt_required()
def get_my_appointments():
    email = get_jwt_identity()
    records = list(mongo.db.Appointments.find({'patient_email': email}, {'_id': 0}))

    if not records:
        return jsonify({'message': 'No appointments found'}), 404

    return jsonify({'appointments': records}), 200


@appointments_bp.route('/doctor-availability', methods=['POST'])
@jwt_required()
def add_doctor_availability():
    data = request.json
    email = get_jwt_identity()

    if not data.get('available_dates') or not isinstance(data['available_dates'], list):
        return jsonify({'error': 'available_dates must be a list of date strings'}), 400

    try:
        for date_str in data['available_dates']:
            datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

    doctor = Doctor.find_by_email(email)
    if not doctor:
        return jsonify({'error': 'Doctor not found'}), 404

    mongo.db['doctor-availability'].update_one(
        {'doctor_email': email},
        {
            '$set': {
                'doctor_name': doctor.fullname,
                'updated_at': datetime.utcnow()
            },
            '$addToSet': {
                'available_dates': {
                    '$each': data['available_dates']
                }
            }
        },
        upsert=True
    )

    return jsonify({
        'message': 'Availability updated',
        'added_dates': data['available_dates']
    }), 200
    
    
    
    
# Get all available dates 
@appointments_bp.route('/my-availability', methods=['GET'])
@jwt_required()
def view_doctor_availability(): 
    doctor_email = get_jwt_identity()

    availability = mongo.db['doctor-availability'].find_one(
        {'doctor_email': doctor_email},
        {'_id': 0, 'available_dates': 1, 'updated_at': 1}
    )

    if not availability:
        return jsonify({'message': 'No availability data found'}), 404

    return jsonify({'available_dates': availability.get('available_dates', [])}), 200



# Get available dates for a specific doctor by email
@appointments_bp.route('/doctor-availability/<email>', methods=['GET'])
def get_doctor_availability(email):
    record = mongo.db['doctor-availability'].find_one({'doctor_email': email}, {'_id': 0})

    if not record:
        return jsonify({'message': 'No availability found for this doctor'}), 404

    return jsonify({'availability': record['available_dates']}), 200




@appointments_bp.route('/doctor-availability/<email>', methods=['GET'])
def get_doctor_availability_by_email(email):
    record = mongo.db['doctor-availability'].find_one({'doctor_email': email}, {'_id': 0})
    if not record:
        return jsonify({'message': 'No availability found for this doctor'}), 404

    return jsonify({'availability': record['available_dates']}), 200




# Doctor view: get all patient appointments
@appointments_bp.route('/doctor-appointments', methods=['GET'])
@jwt_required()
def get_doctor_appointments():
    doctor_email = get_jwt_identity()
    records = list(mongo.db.Appointments.find({'doctor_email': doctor_email}, {'_id': 0}))

    if not records:
        return jsonify({'message': 'No appointments found for this doctor'}), 404

    return jsonify({'appointments': records}), 200

