from core.exceptions import GameInsertionError,GameEditError
from core.logger import logger
from core.data_cache import DataCache
from models.game import Game
from utils.sheet_utils import get_sheet_data,add_to_sheet,edit_row

def edit_game_info(id,updated_game_info: Game):
    try:
        updated_game_row = updated_game_info.convert_to_row()

        # Update the row in the spreadsheet with the updated data
        edit_row(id + 1,[updated_game_row])

        # Update the data cache
        DataCache.clear_lists()
        DataCache.modify_master_list(id,updated_game_row)
        DataCache.populate_lists()

        logger.info("The data cache has been successfully updated with the new data")
    except Exception as e:
        error_message = f"An error occurred: {e}"
        logger.error(error_message)
        raise GameEditError(error_message)

def insert_game_to_sheet(new_game: Game):
    try:
        new_game_row = new_game.convert_to_row()

        # Save the row inside the spreadsheet
        add_to_sheet(new_game_row)

        # Add to the data cache so that the data is updated
        DataCache.clear_lists()
        DataCache.add_game_to_master_list(new_game_row)
        DataCache.populate_lists()

        logger.info("The data cache has successfully been populated with the new data")
    except Exception as e:
        # Handles errors that occur while processing the request
        error_message = f"An error occurred: {e}"
        logger.error(error_message)
        raise GameInsertionError(error_message)

def parse_sheet_data():
    sheet_data = get_sheet_data()

    # Populate the master list with information for all the games
    for i in range(len(sheet_data)):
        DataCache.add_game_to_master_list(sheet_data[i])
    
    # Populate the platform and status dictionary caches
    DataCache.populate_lists()
    
    logger.info("All data has been successfully fetched and cached!")