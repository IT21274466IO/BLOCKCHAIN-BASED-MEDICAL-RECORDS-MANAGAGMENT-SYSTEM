from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

# Initialize extensions
mongo = PyMongo()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    mongo.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    from .auth.routes import auth_bp
    from .predictions.routes import prediction_bp
    from .doctors.routes import doctors_bp
    from .appointments.routes import appointments_bp



    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(prediction_bp, url_prefix='/predict')
    app.register_blueprint(doctors_bp, url_prefix='/doctors')
    app.register_blueprint(appointments_bp, url_prefix='/appointments')

    return app
