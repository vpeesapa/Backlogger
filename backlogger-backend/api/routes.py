from flask import Blueprint,jsonify,request

from core.exceptions import NotFoundError,ValidationError,RequestParamError,GameSearchError
from core.data_cache import DataCache
from core.logger import logger
from models.game import Game
from services.recommend import recommend
from services.sheet_parser import insert_game_to_sheet,edit_game_info,delete_game_info
from services.game_search import fetch_search_matches
from utils.constants import Constants
from utils.common_utils import check_key_in_dict
from utils.enrichers.append_request_enricher import enrich_append_request

api_blueprint = Blueprint("api",__name__)

@api_blueprint.route("/games_by_platform",methods=["GET"])
def fetch_all_games_by_platform():
	all_games_by_platform = {}

	for key in DataCache.GAMES_BY_PLATFORM.keys():
		games_by_platform = []

		for game in DataCache.GAMES_BY_PLATFORM[key]:
			games_by_platform.append(vars(game))

		all_games_by_platform[key] = games_by_platform

	return jsonify(all_games_by_platform),200

@api_blueprint.route("/games_on_platform/<string:platform>",methods=["GET"])
def fetch_games_on_platform(platform):
	if platform not in Constants.VALID_PLATFORMS:
		error_message = f"{platform} is not a valid platform!"

		logger.error(error_message)

		raise ValidationError(error_message)

	games_on_platform = []

	games = DataCache.GAMES_BY_PLATFORM[Constants.VALID_PLATFORMS[platform]]
	for game in games:
		games_on_platform.append(vars(game))

	return jsonify(games_on_platform),200

@api_blueprint.route("/all_games_by_status",methods=["GET"])
def fetch_all_games_by_status():
	all_games_by_status = {}

	for key in DataCache.GAMES_BY_STATUS.keys():
		games_by_status = []

		for game in DataCache.GAMES_BY_STATUS[key]:
			games_by_status.append(vars(game))

		all_games_by_status[key] = games_by_status

	return jsonify(all_games_by_status),200

@api_blueprint.route("/games_by_status/<string:status>",methods=["GET"])
def fetch_games_by_status(status):
	if status not in Constants.VALID_STATUS:
		error_message = f"{status} is not a valid status!"

		logger.error(error_message)

		raise ValidationError(error_message)

	games_by_status = []

	games = DataCache.GAMES_BY_STATUS[Constants.VALID_STATUS[status]]
	for game in games:
		games_by_status.append(vars(game))

	return jsonify(games_by_status),200

@api_blueprint.route("/recommend",methods=["POST"])
def recommend_games():
	data = request.get_json()

	error_message = ""

	if not data:
		error_message = "Can only recommend if certain data is passed!"

		logger.error(error_message)

		raise NotFoundError(error_message)
	
	if not check_key_in_dict(data,Constants.STATUS):
		error_message = f"'{Constants.STATUS}' needs to be present in the request parameter!"

		logger.error(error_message)

		raise RequestParamError(error_message)
	
	if not check_key_in_dict(data,Constants.PLATFORM):
		error_message = f"'{Constants.PLATFORM}' needs to be present in the request parameter!"

		logger.error(error_message)

		raise RequestParamError(error_message)
	
	if not check_key_in_dict(data,Constants.NUM_RECOMMENDED):
		error_message = f"'{Constants.NUM_RECOMMENDED}' needs to be present in the request parameter!"

		logger.error(error_message)

		raise RequestParamError(error_message)

	if data[Constants.STATUS] not in Constants.VALID_STATUS:
		error_message = f"{data[Constants.STATUS]} is not a valid status!"

		logger.error(error_message)

		raise ValidationError(error_message)

	if data[Constants.PLATFORM] not in Constants.VALID_PLATFORMS:
		error_message = f"{data[Constants.PLATFORM]} is not a valid platform!"

		logger.error(error_message)

		raise ValidationError(error_message)

	if type(data[Constants.NUM_RECOMMENDED]) is not int or data[Constants.NUM_RECOMMENDED] <= 0:
		error_message = "The number of recommended games can only be a positive integer"

		logger.error(error_message)

		raise ValidationError(error_message)

	valid_status = Constants.VALID_STATUS[data[Constants.STATUS]]
	valid_platform = Constants.VALID_PLATFORMS[data[Constants.PLATFORM]]
	num_recommended = data[Constants.NUM_RECOMMENDED]

	recommended_games = recommend(valid_platform,valid_status,num_recommended)

	recommended_games_response = []

	for game in recommended_games:
		recommended_games_response.append(vars(game))

	return jsonify(recommended_games_response),200

@api_blueprint.route("/games_distribution_per_status",methods=["GET"])
def fetch_games_distribution_per_status():
	games_per_status = {}

	for key in DataCache.GAMES_BY_STATUS.keys():
		games_per_status[key] = len(DataCache.GAMES_BY_STATUS[key])

	return jsonify(games_per_status),200

@api_blueprint.route("/games_distribution_per_platform",methods=["GET"])
def fetch_games_distribution_per_platform():
	games_per_platform = {}

	for key in DataCache.GAMES_BY_PLATFORM.keys():
		games_per_platform[key] = len(DataCache.GAMES_BY_PLATFORM[key])

	return jsonify(games_per_platform),200

@api_blueprint.route("/add_game",methods=["POST"])
def insert_new_game():
	data = request.get_json()
	
	# Validate the input request
	enriched_data = enrich_append_request(data)

	name = enriched_data["name"]
	cover_image_link = enriched_data["cover_image_link"]
	platform = enriched_data["platform"]
	developer = "; ".join(enriched_data["developer"])
	year = enriched_data["year"]
	completion_time = enriched_data["completion_time"]
	status = enriched_data["status"]
	genres = "; ".join(enriched_data["genres"])
	all_achievements = enriched_data["all_achievements"]
	score = enriched_data["score"]
	backloggd_score = enriched_data["backloggd_score"]

	new_game = Game(name,cover_image_link,platform,developer,year,completion_time,status,genres,all_achievements,score,backloggd_score)

	insert_game_to_sheet(new_game)

	return jsonify({"message": "Successfully inserted"}),200

@api_blueprint.route("/edit_game/<int:id>",methods=["POST"])
def edit_game(id):
	updated_game_data = request.get_json()

	# Validate the input request
	enriched_data = enrich_append_request(updated_game_data)

	name = enriched_data["name"]
	cover_image_link = enriched_data["cover_image_link"]
	platform = enriched_data["platform"]
	developer = "; ".join(enriched_data["developer"])
	year = enriched_data["year"]
	completion_time = enriched_data["completion_time"]
	status = enriched_data["status"]
	genres = "; ".join(enriched_data["genres"])
	all_achievements = enriched_data["all_achievements"]
	score = enriched_data["score"]
	backloggd_score = enriched_data["backloggd_score"]

	updated_game_info = Game(name,cover_image_link,platform,developer,year,completion_time,status,genres,all_achievements,score,backloggd_score)

	edit_game_info(id,updated_game_info)

	return jsonify({"message": "Successfully edited the game information"}),200

@api_blueprint.route("/delete_game/<int:id>",methods=["DELETE"])
def delete_game(id):
	delete_game_info(id)

	return jsonify({"message": "Successfully deleted the game information"}),200

@api_blueprint.route("/search/<string:query>",methods=["GET"])
def search_game(query):
	if not query.strip():
		error_message = "The search query cannot be empty."
		logger.error(error_message)
		raise GameSearchError(error_message)

	matched_objects = fetch_search_matches(query)

	return jsonify({"matches": matched_objects}),200