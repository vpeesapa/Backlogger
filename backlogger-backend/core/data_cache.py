from core.logger import logger
from models.game import Game
from models.status import Status
from models.platform import Platform
from utils.common_utils import add_game_to_dict

class DataCache:
    GAMES_MASTER_LIST = []

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

        cls.GAMES_MASTER_LIST.append(new_game)
    
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