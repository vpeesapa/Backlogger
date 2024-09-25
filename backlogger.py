import sys
import csv
import random
import requests

# GLOBAL VARIABLES
TOTAL_ARGUMENTS = 2
NUM_RECOMMENDED_GAMES = 0

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

# GAME CLASS
class Game:
	def __init__(self,name,platform,developer,year,completionTime,status,genres,score,backloggdScore):
		self.name = name
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
		print("Platform: " + self.platform)
		print("Developer: " + str(self.developer))
		print("Year: " + str(self.year))
		print("Completion Time: " + str(self.completionTime))
		print("Status: " + self.status)
		print("Genres: " + str(self.genres))
		print("Score: " + str(self.score))
		print("Backloggd Score: " + str(self.backloggdScore))
		print()

def AppendToArray(list):
	finalList = []

	intermediateList = list.split("; ")

	for items in intermediateList:
		finalList.append(items)

	return finalList

def AddGameToMasterList(game):
	name = game[0]
	platform = game[1]
	developer = game[2]
	year = game[3]
	completionTime = game[4]
	status = game[5]
	genres = game[6]
	score = game[7]
	backloggdScore = game[8]

	newGame = Game(name,platform,developer,year,completionTime,status,genres,score,backloggdScore)

	GAMES_MASTER_LIST.append(newGame)

def CheckArguments(totalArguments):
	if len(sys.argv) != totalArguments:
		print("Arguments required. Correct format: py backlogger.py <Number of required recommendations>")

		sys.exit(0)

	if int(sys.argv[1]) <= 0:
		print("Number of required recommendations has to be a positive non-zero integer")

		sys.exit(0)

def GetRecommendationsNumber():
	return int(sys.argv[1])

def GetSheetData():
	apiUrl = f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/{SHEET_NAME}!A1:Z?alt=json&key={API_KEY}"

	try:
		# Make a GET request to fetch data from the API
		response = requests.get(apiUrl)
		response.raise_for_status()

		# Parse the JSON response
		data = response.json()

		return data
	except requests.exceptions.RequestException as e:
		# Handle errors that occur during the request
		print(f"An error occured: {e}")

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
		
def RecommendGames(list):
	recommendedGames = []

	# Use this integer to keep track of the number of games that have already been recommended
	currentNumRecommendedGames = 0

	totalRecommendedGames = 0

	# Check to ensure that there is no infinite looping
	if NUM_RECOMMENDED_GAMES > len(list):
		totalRecommendedGames = len(list)
	else:
		totalRecommendedGames = NUM_RECOMMENDED_GAMES

	while currentNumRecommendedGames < totalRecommendedGames:
		# Select a random game from the list of backlog games
		recommendedGame = random.choice(list)

		if recommendedGame not in recommendedGames:
			recommendedGames.append(recommendedGame)

			# Only iterate when a unique game has been recommended
			currentNumRecommendedGames += 1
	
	return recommendedGames

def RecommendGamesByPlatform(platform,status):
	# Getting all the backlogged games in the platform
	eligibleGames = []
	for gamesInfo in GAMES_BY_PLATFORM[platform]:
		if gamesInfo.status == status:
			eligibleGames.append(gamesInfo)

	return RecommendGames(eligibleGames)

def PrintNumberOfGamesPerPlatform():
	print("The number of games per platform is as follows: ")
	for key in GAMES_BY_PLATFORM.keys():
		print(key + ": " + str(len(GAMES_BY_PLATFORM[key])))

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
	global NUM_RECOMMENDED_GAMES

	CheckArguments(TOTAL_ARGUMENTS)

	NUM_RECOMMENDED_GAMES = GetRecommendationsNumber()

	sheetData = GetSheetData()

	if not sheetData:
		print("Failed to fetch data from Google Sheets API")
		return

	ParseSheetData(sheetData)

	PopulateLists()

	recommendedGames = RecommendGamesByPlatform(PC_STEAM,BACKLOG)

	PrintAllGamesInfo(recommendedGames)

	PrintNumberOfGamesPerPlatform()

if __name__ == "__main__":
	main()
