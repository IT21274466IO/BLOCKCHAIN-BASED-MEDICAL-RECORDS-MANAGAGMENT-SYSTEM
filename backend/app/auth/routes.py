from flask import Blueprint, request, jsonify
from .models import Patient
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from datetime import timedelta




auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if Patient.find_by_email(data['email']):
        return jsonify({'error': 'Email already registered'}), 409

    user = Patient(
        fullname=data['fullname'],
        email=data['email'],
        password=data['password'],
        mobile=data.get('mobile'),
        profile_image=data.get('profile_image')
    )
    user.save()

    # Generate JWT token after registration
    access_token = create_access_token(identity=user.email, expires_delta=timedelta(days=1))
    
    return jsonify({
        'message': 'User registered successfully',
        'token': access_token,
        'fullname': user.fullname,
        'email': user.email
    }), 201




@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Patient.find_by_email(data['email'])
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.email, expires_delta=timedelta(days=1))
        return jsonify({'token': access_token,
                        'fullname': user.fullname,
    'email': user.email}), 200

    return jsonify({'error': 'Invalid credentials'}), 401




@auth_bp.route('/edit-profile', methods=['PUT'])
@jwt_required()
def edit_profile():
    current_user_email = get_jwt_identity()
    user = Patient.find_by_email(current_user_email)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    user.fullname = data.get('fullname', user.fullname)
    user.email = data.get('email', user.email)
    user.mobile = data.get('mobile', user.mobile)
    user.profile_image = data.get('profile_image', user.profile_image)

    user.save()

    return jsonify({
        'message': 'Profile updated successfully',
        'fullname': user.fullname,
        'email': user.email,
        'mobile': user.mobile,
        'profile_image': user.profile_image
    }), 200


@auth_bp.route('/get-profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = Patient.find_by_email(current_user_email)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'fullname': user.fullname,
        'email': user.email,
        'mobile': user.mobile,
        'profile_image': user.profile_image
    }), 200



@auth_bp.route('/delete-profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    current_user_email = get_jwt_identity()
    user = Patient.find_by_email(current_user_email)

    if not user or not user.delete():
        return jsonify({'error': 'User not found or could not be deleted'}), 404

    return jsonify({'message': 'User profile deleted successfully'}), 200
