import os

from dotenv import load_dotenv

load_dotenv()

class Config:
    SHEET_ID = os.getenv("SHEET_ID")
    SHEET_NAME = os.getenv("SHEET_NAME")
    API_KEY = os.getenv("API_KEY")

    LOGGING_FILE_NAME = os.getenv("LOGGING_FILE_NAME")

    BACKEND_PORT_NUMBER = os.getenv("BACKEND_PORT_NUMBER")