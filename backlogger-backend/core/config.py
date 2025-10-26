import os

from dotenv import load_dotenv

load_dotenv()

class Config:
    SHEET_ID = os.getenv("SHEET_ID")
    SHEET_RANGE = os.getenv("SHEET_RANGE")
    CREDENTIALS_FILE = os.getenv("CREDENTIALS_FILE")

    LOGGING_FILE_NAME = os.getenv("LOGGING_FILE_NAME")