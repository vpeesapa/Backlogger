from flask import Flask
from flask_cors import CORS

from .routes import api_blueprint

from services.sheet_parser import parse_sheet_data

def create_app():
    app = Flask(__name__)
    CORS(app,resources={r"*": {"origins": "http://localhost:3000"}})

    # Register blueprints to link the endpoints to the application
    app.register_blueprint(api_blueprint)

    # Read data from the sheet and cache them
    parse_sheet_data()

    return app