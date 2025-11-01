import gspread
from google.oauth2.service_account import Credentials

from core.config import Config
from core.logger import logger
from core.exceptions import NotFoundError,GameInsertionError,GameEditError,InvalidRowError
from core.data_cache import DataCache

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets"
]

try:
    creds = Credentials.from_service_account_file(Config.CREDENTIALS_FILE,scopes=SCOPES)
    client = gspread.authorize(credentials=creds)

    sheet_id = Config.SHEET_ID
    sheet = client.open_by_key(sheet_id).sheet1
    logger.info("Configuration with the Google Sheets API was successful!")
except Exception as e:
    logger.error(f"An error occurred: {e}")
    raise NotFoundError(f"Configuration with the Google Sheets API failed!")

def get_sheet_data():
    sheet_data = sheet.get_values(Config.SHEET_RANGE)
    return sheet_data

def add_to_sheet(new_data):
    try:
        sheet.append_row(new_data)
        logger.info(f"The new row {new_data} was successfully inserted in the spreadsheet!")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise GameInsertionError(f"Insertion of row {new_data} failed!")

def edit_row(row_number,updated_data):
    try:
        if row_number <= 0 or row_number > DataCache.fetch_total_games() + 1:
            raise InvalidRowError(f"Accessing invalid row: {row_number}")
        
        num_cols = len(updated_data[0])
        
        range_str = f"A{row_number}:{chr(65 + num_cols)}{row_number}"
        sheet.update(updated_data,range_str)
        logger.info(f"Row {row_number} was successfully updated with {updated_data} in the spreadsheet!")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise GameEditError(f"Editing row {row_number} failed!")