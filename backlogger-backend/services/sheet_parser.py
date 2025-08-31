import requests

from core.config import Config
from core.logger import logger
from core.data_cache import DataCache

def get_sheet_data():
    sheet_id = Config.SHEET_ID
    sheet_name = Config.SHEET_NAME
    api_key = Config.API_KEY

    api_url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{sheet_name}!A1:Z?alt=json&key={api_key}"

    try:
        # Make a GET request to fetch data from the sheet
        response = requests.get(api_url)
        response.raise_for_status()

        # Parse the JSON response
        return response.json()
    except requests.exceptions.RequestException as e:
        # Handle errors that occur while processing the request
        logger.error(f"An error occured: {e}")

        return None

def parse_sheet_data():
    sheet_data = get_sheet_data()

    if not sheet_data:
        logger.error("Failed to fetch data from the Google Sheets API")

        return

    # Save the headers
    data_headers = sheet_data["values"][0]

    # Populate the master list with information for all the games
    for i in range(1,len(sheet_data["values"])):
        DataCache.add_game_to_master_list(sheet_data["values"][i])
    
    # Populate the platform and status dictionary caches
    DataCache.populate_lists()
    
    logger.info("All data has been successfully fetched and cached!")