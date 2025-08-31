from flask import Blueprint,jsonify,request

from core.data_cache import DataCache
from services.recommend import recommend
from utils.constants import Constants

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
		return jsonify(f"{platform} is not a valid platform!"),400

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
		return jsonify(f"{status} is not a valid status!"),400

	games_by_status = []

	games = DataCache.GAMES_BY_STATUS[Constants.VALID_STATUS[status]]
	for game in games:
		games_by_status.append(vars(game))

	return jsonify(games_by_status),200

@api_blueprint.route("/recommend",methods=["POST"])
def recommend_games():
	data = request.get_json()

	if not data:
		return jsonify("Can only recommend if certain data is passed!"),400

	if data["status"] not in Constants.VALID_STATUS:
		return jsonify(f"{data['status']} is not a valid status!"),400

	if data["platform"] not in Constants.VALID_PLATFORMS:
		return jsonify(f"{data['platform']} is not a valid platform!"),400

	if type(data["numRecommended"]) is not int or data["numRecommended"] <= 0:
		return jsonify("The number of recommended games can only be a positive integer"),400

	valid_status = Constants.VALID_STATUS[data["status"]]
	valid_platform = Constants.VALID_PLATFORMS[data["platform"]]
	num_recommended = data["numRecommended"]

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