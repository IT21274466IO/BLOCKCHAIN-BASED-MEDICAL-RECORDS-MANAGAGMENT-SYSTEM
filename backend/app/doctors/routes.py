from flask import Blueprint, request, jsonify
from app.doctors.models import Doctor
from flask_jwt_extended import create_access_token
from datetime import timedelta

doctors_bp = Blueprint('doctors', __name__)

@doctors_bp.route('/register', methods=['POST'])
def register_doctor():
    data = request.json
    if Doctor.find_by_email(data['email']):
        return jsonify({'error': 'Doctor already exists'}), 409

    doctor = Doctor(
        fullname=data['fullname'],
        email=data['email'],
        specialization=data['specialization'],
        hospital=data['hospital'],
        password=data['password'],
        mobile=data.get('mobile'),
        profile_image=data.get('profile_image')
    )
    doctor.save()

    # Generate JWT token after registration
    access_token = create_access_token(identity=doctor.email, expires_delta=timedelta(days=1))

    return jsonify({
        'message': 'Doctor registered successfully',
        'token': access_token,
        'role': 'doctor'
    }), 201


@doctors_bp.route('/login', methods=['POST'])
def login_doctor():
    data = request.json
    doctor = Doctor.find_by_email(data['email'])

    if doctor and doctor.check_password(data['password']):
        access_token = create_access_token(identity=doctor.email, expires_delta=timedelta(days=1))
        return jsonify({'token': access_token, 'role': 'doctor'}), 200

    return jsonify({'error': 'Invalid credentials'}), 401


@doctors_bp.route('/all', methods=['GET'])
def get_all_doctors():
    doctors = Doctor.get_all()
    return jsonify([
        {
            'fullname': d['fullname'],
            'email': d['email'],
            'specialization': d['specialization'],
            'hospital': d['hospital'],
            'mobile': d.get('mobile'),
            'profile_image': d.get('profile_image')
        } for d in doctors
    ]), 200
