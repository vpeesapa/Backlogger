from fuzzywuzzy import fuzz,process

from core.config import Config
from core.logger import logger
from models.game import Game
from models.status import Status
from models.platform import Platform
from utils.common_utils import add_game_to_dict

class DataCache:
    GAMES_MASTER_LIST: list[Game] = []

    GAMES_BY_STATUS = {}
    GAMES_BY_PLATFORM = {}

    @classmethod
    def add_game_to_master_list(cls,game):
        name = game[0]
        cover_image_link = game[1]
        platform = game[2]
        developer = game[3]
        year = game[4]
        completion_time = game[5]
        status = game[6]
        genres = game[7]
        all_achievements = game[8]
        score = game[9]
        backloggd_score = game[10]

        new_game = Game(name,cover_image_link,platform,developer,year,completion_time,status,genres,all_achievements,score,backloggd_score)
        new_game.assign_id(cls.fetch_total_games() + 1)

        cls.GAMES_MASTER_LIST.append(new_game)
    
    @classmethod
    def modify_master_list(cls,id,game):
        name = game[0]
        cover_image_link = game[1]
        platform = game[2]
        developer = game[3]
        year = game[4]
        completion_time = game[5]
        status = game[6]
        genres = game[7]
        all_achievements = game[8]
        score = game[9]
        backloggd_score = game[10]

        updated_game = Game(name,cover_image_link,platform,developer,year,completion_time,status,genres,all_achievements,score,backloggd_score)
        updated_game.assign_id(id)

        cls.GAMES_MASTER_LIST[id - 1] = updated_game
    
    @classmethod
    def remove_from_master_list(cls,id):
        cls.GAMES_MASTER_LIST.pop(id - 1)

        # Re-index all the remaining games to match the corresponding row numbers
        for index,game in enumerate(cls.GAMES_MASTER_LIST):
            game.assign_id(index + 1,is_reindexing=True)
    
    @classmethod
    def search_master_list(cls,query: str):
        search_results = []

        game_names = [game.name.lower() for game in cls.GAMES_MASTER_LIST]

        # Performs a fuzzy search to find best matches to the query
        best_matches = process.extract(query,game_names,scorer=fuzz.partial_ratio,limit=Config.SEARCH_LIMIT)

        for match in best_matches:
            # Ignore matches that do not meet the threshold
            if match[1] < Config.SEARCH_THRESHOLD_SCORE:
                continue

            match_name = match[0]
            matched_game = next(vars(game) for game in cls.GAMES_MASTER_LIST if game.name.lower() == match_name)
            search_results.append(matched_game)

        return search_results
    
    @classmethod
    def differentiate_games_by_status(cls,games_info: Game):
        if not Status.has_value(games_info.status):
            logger.error(f"{games_info.status} is not a valid status for {games_info.name}")

            return
        
        add_game_to_dict(cls.GAMES_BY_STATUS,games_info.status,games_info)
    
    @classmethod
    def differentiate_games_by_platform(cls,games_info: Game):
        if not Platform.has_value(games_info.platform):
            logger.error(f"{games_info.platform} is not a valid platform for {games_info.name}")

            return
        
        add_game_to_dict(cls.GAMES_BY_PLATFORM,games_info.platform,games_info)

    @classmethod
    def populate_lists(cls):
        for games_info in cls.GAMES_MASTER_LIST:
            cls.differentiate_games_by_status(games_info)

            cls.differentiate_games_by_platform(games_info)
    
    @classmethod
    def clear_lists(cls):
        cls.GAMES_BY_STATUS.clear()
        cls.GAMES_BY_PLATFORM.clear()
    
    @classmethod
    def fetch_total_games(cls):
        return len(cls.GAMES_MASTER_LIST)