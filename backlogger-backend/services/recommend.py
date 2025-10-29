import random
from typing import List

from core.logger import logger
from core.data_cache import DataCache
from models.game import Game

def recommend(platform: str,status: str,num_recommended: int) -> List[Game]:
    eligibleGames = []

    for gamesInfo in DataCache.GAMES_BY_PLATFORM[platform]:
        if gamesInfo.status == status:
            eligibleGames.append(gamesInfo)
    
    return recommend_games(eligibleGames,num_recommended)

def recommend_games(list_of_games: List[Game],num_recommended: int) -> List[Game]:
    recommended_games = set()

    total_recommended_games = 0

    # Filtering the list to avoid recommending unreleased games
    filtered_list = list(filter(lambda x: x.completion_time != "-",list_of_games))

    # Check to ensure that there is no infinite looping
    if num_recommended > len(filtered_list):
        total_recommended_games = len(filtered_list)
    else:
        total_recommended_games = num_recommended
    
    logger.info(f"Recommending {total_recommended_games} out of a total of {len(filtered_list)} games!")

    while len(recommended_games) < total_recommended_games:
        # Select a random game from the list of backlog games and add it to the set
        recommended_game = random.choice(filtered_list)
        recommended_games.add(recommended_game)

    return list(recommended_games)