import os
import sys
import random
import requests
import logging
from dotenv import load_dotenv
from flask import Flask,request,jsonify

# Master list consisting of info for all games
GAMES_MASTER_LIST = []

# Dictionary that structures the games based on their status
GAMES_BY_STATUS = {}
BACKLOG = "Backlog"
COMPLETE = "Complete"
WISHLIST = "Wishlist"
DROPPED = "Dropped"
IN_PROGRESS = "In Progress"

# Dictionary that structures the games based on their platforms
GAMES_BY_PLATFORM = {}
PC_STEAM = "PC (Steam)"
NINTENDO_SWITCH = "Nintendo Switch"
PC_EPIC = "PC (Epic)"
PS5 = "PS5"
XBOX_GAME_PASS = "Xbox Game Pass"
PS4 = "PS4"
NINTENDO_GAMEBOY = "Nintendo Gameboy"
NINTENDO_DS = "Nintendo DS"
NINTENDO_3DS = "Nintendo 3DS"

# Data structures to check for validity of input
VALID_STATUS = {
	"backlog": BACKLOG,
	"complete": COMPLETE,
	"wishlist": WISHLIST,
	"dropped": DROPPED,
	"in_progress": IN_PROGRESS
}

VALID_PLATFORMS = {
	"steam": PC_STEAM,
	"nintendo_switch": NINTENDO_SWITCH,
	"epic": PC_EPIC,
	"ps5": PS5,
	"xbox_game_pass": XBOX_GAME_PASS,
	"ps4": PS4,
	"nintendo_gameboy": NINTENDO_GAMEBOY,
	"nintendo_ds": NINTENDO_DS,
	"nintendo_3ds": NINTENDO_3DS
}

# Create an instance of the backend application
app = Flask(__name__)

# LOG CONFIGURATIONS
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Console handler
consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.INFO)
consoleHandler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

# File handler
fileHandler = logging.FileHandler("backlogger.log")
fileHandler.setLevel(logging.INFO)
fileHandler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

# Add both the handlers to the loggers
logger.addHandler(consoleHandler)
logger.addHandler(fileHandler)

# GAME CLASS
class Game:
	def __init__(self,name,coverImageLink,platform,developer,year,completionTime,status,genres,score,backloggdScore):
		self.name = name
		self.coverImageLink = coverImageLink
		self.platform = platform

		# The game could have multiple developers, so it's better to have a list
		self.developer = AppendToArray(developer)

		if year != "-":
			self.year = int(year)
		else:
			self.year = year

		if completionTime != "-":
			self.completionTime = float(completionTime)
		else:
			self.completionTime = completionTime

		self.status = status

		# The game can have many genres, so it's better to have a list again
		self.genres = AppendToArray(genres)

		if score != "-":
			self.score = float(score)
		else:
			self.score = score

		if backloggdScore != "-":
			self.backloggdScore = float(backloggdScore)
		else:
			self.backloggdScore = backloggdScore

	def PrintGameInfo(self):
		print("Name: " + self.name)
		print("Cover Image Link: " + self.coverImageLink)
		print("Platform: " + self.platform)
		print("Developer: " + str(self.developer))
		print("Year: " + str(self.year))
		print("Completion Time: " + str(self.completionTime))
		print("Status: " + self.status)
		print("Genres: " + str(self.genres))
		print("Score: " + str(self.score))
		print("Backloggd Score: " + str(self.backloggdScore))
		print()

	def ToDict(self):
		return {
			"name": self.name,
			"coverImageLink": self.coverImageLink,
			"platform": self.platform,
			"developer": self.developer,
			"year": self.year,
			"completionTime": self.completionTime,
			"status": self.status,
			"genres": self.genres,
			"score": self.score,
			"backloggdScore": self.backloggdScore
		}

def AppendToArray(list):
	finalList = []

	intermediateList = list.split("; ")

	for items in intermediateList:
		finalList.append(items)

	return finalList

def AddGameToMasterList(game):
	name = game[0]
	coverImageLink = game[1]
	platform = game[2]
	developer = game[3]
	year = game[4]
	completionTime = game[5]
	status = game[6]
	genres = game[7]
	score = game[8]
	backloggdScore = game[9]

	newGame = Game(name,coverImageLink,platform,developer,year,completionTime,status,genres,score,backloggdScore)

	GAMES_MASTER_LIST.append(newGame)

def loadEnvironment():
	load_dotenv()

def GetSheetData():
	sheetId = os.getenv("SHEET_ID")
	sheetName = os.getenv("SHEET_NAME")
	apiKey = os.getenv("API_KEY")

	apiUrl = f"https://sheets.googleapis.com/v4/spreadsheets/{sheetId}/values/{sheetName}!A1:Z?alt=json&key={apiKey}"

	try:
		# Make a GET request to fetch data from the API
		response = requests.get(apiUrl)
		response.raise_for_status()

		# Parse the JSON response
		data = response.json()

		return data
	except requests.exceptions.RequestException as e:
		# Handle errors that occur during the request
		logger.error(f"An error occured: {e}")

		return None

def ParseSheetData(data):
	# Save the headers
	dataKeys = data["values"][0]

	for i in range(1,len(data["values"])):
		AddGameToMasterList(data["values"][i])

def AddGameToDict(dict,key,gamesInfo):
	# Initialize the list if the key does not exist
	if key not in dict:
		dict[key] = []

	dict[key].append(gamesInfo)

def DifferentiateGamesByStatus(gamesInfo):
	if gamesInfo.status == BACKLOG:
		AddGameToDict(GAMES_BY_STATUS,BACKLOG,gamesInfo)
	elif gamesInfo.status == COMPLETE:
		AddGameToDict(GAMES_BY_STATUS,COMPLETE,gamesInfo)
	elif gamesInfo.status == WISHLIST:
		AddGameToDict(GAMES_BY_STATUS,WISHLIST,gamesInfo)
	elif gamesInfo.status == DROPPED:
		AddGameToDict(GAMES_BY_STATUS,DROPPED,gamesInfo)
	elif gamesInfo.status == IN_PROGRESS:
		AddGameToDict(GAMES_BY_STATUS,IN_PROGRESS,gamesInfo)

def DifferentiateGamesByPlatform(gamesInfo):
	if gamesInfo.platform == PC_STEAM:
		AddGameToDict(GAMES_BY_PLATFORM,PC_STEAM,gamesInfo)
	elif gamesInfo.platform == NINTENDO_SWITCH:
		AddGameToDict(GAMES_BY_PLATFORM,NINTENDO_SWITCH,gamesInfo)
	elif gamesInfo.platform == PC_EPIC:
		AddGameToDict(GAMES_BY_PLATFORM,PC_EPIC,gamesInfo)
	elif gamesInfo.platform == PS5:
		AddGameToDict(GAMES_BY_PLATFORM,PS5,gamesInfo)
	elif gamesInfo.platform == XBOX_GAME_PASS:
		AddGameToDict(GAMES_BY_PLATFORM,XBOX_GAME_PASS,gamesInfo)
	elif gamesInfo.platform == PS4:
		AddGameToDict(GAMES_BY_PLATFORM,PS4,gamesInfo)
	elif gamesInfo.platform == NINTENDO_GAMEBOY:
		AddGameToDict(GAMES_BY_PLATFORM,NINTENDO_GAMEBOY,gamesInfo)
	elif gamesInfo.platform == NINTENDO_DS:
		AddGameToDict(GAMES_BY_PLATFORM,NINTENDO_DS,gamesInfo)
	elif gamesInfo.platform == NINTENDO_3DS:
		AddGameToDict(GAMES_BY_PLATFORM,NINTENDO_3DS,gamesInfo)

def PopulateLists():
	for gamesInfo in GAMES_MASTER_LIST:
		DifferentiateGamesByStatus(gamesInfo)

		DifferentiateGamesByPlatform(gamesInfo)
		
def RecommendGames(lst,numRecommended):
	recommendedGames = []

	# Use this integer to keep track of the number of games that have already been recommended
	currentNumRecommendedGames = 0

	totalRecommendedGames = 0

	# Filtering the list to avoid recommending unreleased games
	filteredList = list(filter(lambda x: x.year != "-",lst))

	# Check to ensure that there is no infinite looping
	if numRecommended > len(filteredList):
		totalRecommendedGames = len(filteredList)
	else:
		totalRecommendedGames = numRecommended

	logger.info(f"Recommending {totalRecommendedGames} out of a total of {len(filteredList)} games!")

	while currentNumRecommendedGames < totalRecommendedGames:
		# Select a random game from the list of backlog games
		recommendedGame = random.choice(filteredList)

		if recommendedGame not in recommendedGames:
			recommendedGames.append(recommendedGame)

			# Only iterate when a unique game has been recommended
			currentNumRecommendedGames += 1
	
	return recommendedGames

def RecommendGamesWrapper(platform,status,numRecommended):
	eligibleGames = []
	for gamesInfo in GAMES_BY_PLATFORM[platform]:
		if gamesInfo.status == status:
			eligibleGames.append(gamesInfo)

	return RecommendGames(eligibleGames,numRecommended)

def PrintNumberOfGamesPerPlatform():
	print("The number of games per platform is as follows: ")
	for key in GAMES_BY_PLATFORM.keys():
		print(key + ": " + str(len(GAMES_BY_PLATFORM[key])))

# APIs
@app.route("/games_by_platform",methods=["GET"])
def fetchAllGamesByPlatform():
	allGamesByPlatform = {}

	for key in GAMES_BY_PLATFORM.keys():
		gamesByPlatform = []

		for game in GAMES_BY_PLATFORM[key]:
			gamesByPlatform.append(game.ToDict())

		allGamesByPlatform[key] = gamesByPlatform

	return jsonify(allGamesByPlatform),200

@app.route("/games_on_platform/<string:platform>",methods=["GET"])
def fetchGamesOnPlatform(platform):
	if platform not in VALID_PLATFORMS:
		return jsonify(f"{platform} is not a valid platform!"),400

	gamesOnPlatform = []

	games = GAMES_BY_PLATFORM[VALID_PLATFORMS[platform]]
	for game in games:
		gamesOnPlatform.append(game.ToDict())

	return jsonify(gamesOnPlatform),200

@app.route("/all_games_by_status",methods=["GET"])
def fetchAllGamesByStatus():
	allGamesByStatus = {}

	for key in GAMES_BY_STATUS.keys():
		gamesByStatus = []

		for game in GAMES_BY_STATUS[key]:
			gamesByStatus.append(game.ToDict())

		allGamesByStatus[key] = gamesByStatus

	return jsonify(allGamesByStatus),200

@app.route("/games_by_status/<string:status>",methods=["GET"])
def fetchGamesByStatus(status):
	if status not in VALID_STATUS:
		return jsonify(f"{status} is not a valid status!"),400

	gamesByStatus = []

	games = GAMES_BY_STATUS[VALID_STATUS[status]]
	for game in games:
		gamesByStatus.append(game.ToDict())

	return jsonify(gamesByStatus),200

@app.route("/recommend",methods=["GET"])
def recommend():
	data = request.get_json()

	if not data:
		return jsonify("Can only recommend if certain data is passed!"),400

	if data["status"] not in VALID_STATUS:
		return jsonify(f"{data['status']} is not a valid status!"),400

	if data["platform"] not in VALID_PLATFORMS:
		return jsonify(f"{data['platform']} is not a valid platform!"),400

	if type(data["numRecommended"]) is not int or data["numRecommended"] <= 0:
		return jsonify("The number of recommended games can only be a positive integer"),400

	validStatus = VALID_STATUS[data["status"]]
	validPlatform = VALID_PLATFORMS[data["platform"]]
	numRecommended = data["numRecommended"]

	recommendedGames = RecommendGamesWrapper(validPlatform,validStatus,numRecommended)

	recommendedGamesResponse = []

	for game in recommendedGames:
		recommendedGamesResponse.append(game.ToDict())

	return jsonify(recommendedGamesResponse),200

@app.route("/games_distribution_per_status",methods=["GET"])
def fetchGamesDistributionPerStatus():
	gamesPerStatus = {}

	for key in GAMES_BY_STATUS.keys():
		gamesPerStatus[key] = len(GAMES_BY_STATUS[key])

	return jsonify(gamesPerStatus),200

@app.route("/games_distribution_per_platform",methods=["GET"])
def fetchGamesDistributionPerPlatform():
	gamesPerPlatform = {}

	for key in GAMES_BY_PLATFORM.keys():
		gamesPerPlatform[key] = len(GAMES_BY_PLATFORM[key])

	return jsonify(gamesPerPlatform),200

# PRINTING FUNCTIONS
def PrintAllGamesInfo(list):
	if len(list) == 0:
		print("There's nothing to display.")
		print()

		return

	for gamesInfo in list:
		gamesInfo.PrintGameInfo()

# DRIVER FUNCTION
def main():
	logger.info("Fetching data from Google Sheets...")
	loadEnvironment()

	sheetData = GetSheetData()

	if not sheetData:
		logger.error("Failed to fetch data from Google Sheets API")
		return

	logger.info("Processing fetched data...")

	ParseSheetData(sheetData)

	PopulateLists()

	logger.info("Starting the server...")

	app.run(debug=True,port=6000)

if __name__ == "__main__":
	main()