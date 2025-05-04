from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from app import mongo

# blockchain
from app.blockchain.interact_contract import store_record
import hashlib
import json


# Model 1: Skin & Eye Disease + Doctor Recommendation
from .model1.skin_eye_predictor import predict_image

# Model 2: Risk Analysis
from .model2.fbs_predictor import predict_fbs

# Model 3: Image Identification
from .model3.image_identifier import identify_image

# Model 4: NLP
from .model4.nlp_predictor import predict_from_text, convert_audio_to_text




prediction_bp = Blueprint('prediction', __name__)

def get_mongo_db():
    return mongo.db


UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)




# eye-skin disease prediction
@prediction_bp.route('/skin-eye-predict', methods=['POST'])
@jwt_required()
def predict_skin_or_eye():
    current_user_email = get_jwt_identity()

    if 'file' not in request.files or 'model_type' not in request.form:
        return jsonify({'error': 'File and model_type are required'}), 400

    file = request.files['file']
    model_type = request.form['model_type']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join('uploads', secure_filename(file.filename))
    file.save(file_path)

    predicted_label, confidence, doctor_info = predict_image(file_path, model_type)

    # Hash prediction 
    hash_input = {
        "email": current_user_email,
        "type": model_type,
        "label": predicted_label,
        "confidence": confidence,
        "timestamp": str(datetime.utcnow())
    }
    hash_string = json.dumps(hash_input, sort_keys=True).encode()
    file_hash = hashlib.sha256(hash_string).hexdigest()

    #Store on blockchain
    tx_id = store_record(current_user_email, predicted_label, file_hash)

    get_mongo_db().SkinEye_predictions.insert_one({
        **hash_input,
        'doctor_info': doctor_info,
        'local_image_path': file_path,
        'blockchain_tx_id': tx_id
    })
 #response
    return jsonify({
        **hash_input,
        'doctor_info': doctor_info,
        'local_image_path': file_path,
        'blockchain_tx_id': tx_id
    }), 200




# eye-skin get predictions
@prediction_bp.route('/skin-eye-predictions', methods=['GET'])
@jwt_required()
def get_user_skin_eye_predictions():
    email = get_jwt_identity()
    records = list(get_mongo_db().SkinEye_predictions.find({'email': email}, {'_id': 0}))

    if not records:
        return jsonify({'message': 'No predictions found'}), 404

    return jsonify({'predictions': records}), 200




# risk-analysis prediction
@prediction_bp.route('/risk-analysis', methods=['POST'])
@jwt_required()
def predict_risk():
    from app.blockchain.interact_contract import store_record
    import hashlib, json

    current_user_email = get_jwt_identity()

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, secure_filename(file.filename))
    file.save(file_path)

    try:
        result = predict_fbs(file_path)

        # Blockchain hash
        hash_input = {
            "email": current_user_email,
            "fbs_value": result["fbs_value"],
            "risk_level": result["prediction"],
            "timestamp": str(datetime.utcnow())
        }
        hash_string = json.dumps(hash_input, sort_keys=True).encode()
        file_hash = hashlib.sha256(hash_string).hexdigest()

        # Store on blockchain
        tx_id = store_record(current_user_email, result["prediction"], file_hash)

        get_mongo_db().Risk_predictions.insert_one({
            **hash_input,
            "image_path": file_path,
            "blockchain_tx_id": tx_id
        })
        #response
        return jsonify({**result, "blockchain_tx_id": tx_id}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500




# risk-analysis get predictions
@prediction_bp.route('/risk-predictions', methods=['GET'])
@jwt_required()
def get_user_risk_predictions():
    email = get_jwt_identity()
    records = list(get_mongo_db().Risk_predictions.find({'email': email}, {'_id': 0}))
    if not records:
        return jsonify({'message': 'No predictions found'}), 404
    return jsonify({'predictions': records}), 200





# image identifier prediction
@prediction_bp.route('/identify-image', methods=['POST'])
@jwt_required()
def predict_image_class():
    from app.blockchain.interact_contract import store_record
    import hashlib, json

    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        label, confidence = identify_image(filepath)
        email = get_jwt_identity()

        # Hash prediction
        hash_input = {
            "email": email,
            "predicted_class": label,
            "confidence": confidence,
            "timestamp": str(datetime.utcnow())
        }
        hash_string = json.dumps(hash_input, sort_keys=True).encode()
        file_hash = hashlib.sha256(hash_string).hexdigest()

        # Store to blockchain
        tx_id = store_record(email, label, file_hash)

        mongo.db.Image_predictions.insert_one({
            **hash_input,
            "image_path": filepath,
            "blockchain_tx_id": tx_id
        })

        # Response
        return jsonify({**hash_input, "blockchain_tx_id": tx_id}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
    
    
    
    
# image identifier get predictions
@prediction_bp.route('/image-predictions', methods=['GET'])
@jwt_required()
def get_user_image_predictions():
    email = get_jwt_identity()
    records = list(mongo.db.Image_predictions.find({'email': email}, {'_id': 0}))
    if not records:
        return jsonify({'message': 'No predictions found'}), 404
    return jsonify({'predictions': records}), 200





# NLP prediction from text
@prediction_bp.route('/nlp-text', methods=['POST'])
@jwt_required()
def predict_nlp_text():
    from app.blockchain.interact_contract import store_record
    import hashlib, json

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Text input is required'}), 400

    results = predict_from_text(data['text'])
    email = get_jwt_identity()

    # Hash prediction
    hash_input = {
        "email": email,
        "input": data['text'],
        "results": results,
        "timestamp": str(datetime.utcnow())
    }
    hash_string = json.dumps(hash_input, sort_keys=True).encode()
    file_hash = hashlib.sha256(hash_string).hexdigest()

    # Blockchain record
    tx_id = store_record(email, "NLP Text", file_hash)

    mongo.db.NLP_predictions.insert_one({
        **hash_input,
        "input_type": "text",
        "blockchain_tx_id": tx_id
    })

    return jsonify({**results, "blockchain_tx_id": tx_id}), 200





# NLP prediction from audio
@prediction_bp.route('/nlp-audio', methods=['POST'])
@jwt_required()
def predict_nlp_audio():
    from app.blockchain.interact_contract import store_record
    import hashlib, json

    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No audio file uploaded'}), 400

    filename = secure_filename(file.filename)
    audio_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(audio_path)

    text = convert_audio_to_text(audio_path)
    os.remove(audio_path)

    if not text:
        return jsonify({'error': 'Speech recognition failed'}), 400

    results = predict_from_text(text)
    email = get_jwt_identity()

    # Hash prediction
    hash_input = {
        "email": email,
        "transcribed_text": text,
        "results": results,
        "timestamp": str(datetime.utcnow())
    }
    hash_string = json.dumps(hash_input, sort_keys=True).encode()
    file_hash = hashlib.sha256(hash_string).hexdigest()

    # Blockchain
    tx_id = store_record(email, "NLP Audio", file_hash)

    mongo.db.NLP_predictions.insert_one({
        **hash_input,
        "input_type": "audio",
        "blockchain_tx_id": tx_id
    })

    return jsonify({"transcribed_text": text, **results, "blockchain_tx_id": tx_id}), 200






# NLP get predictions
@prediction_bp.route('/nlp-predictions', methods=['GET'])
@jwt_required()
def get_user_nlp_predictions():
    email = get_jwt_identity()
    records = list(get_mongo_db().NLP_predictions.find({'email': email}, {'_id': 0}))
    if not records:
        return jsonify({'message': 'No NLP predictions found'}), 404
    return jsonify({'predictions': records}), 200
