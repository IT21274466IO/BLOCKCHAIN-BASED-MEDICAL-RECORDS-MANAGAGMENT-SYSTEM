import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'Medup2025')  #security key
    MONGO_URI = os.getenv('MONGO_URI' ,'mongodb+srv://Medup:Medup2025@medup.bxtmedl.mongodb.net/Medup?retryWrites=true&w=majority&appName=Medup')  # MongoDB 