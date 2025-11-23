from utils.common_utils import append_to_array

class Game:
	def __init__(self,name,cover_image_link,platform,developer,year,completion_time,status,genres,all_achievements,score,backloggd_score):
		self.id = -1

		self.name = name
		self.cover_image_link = cover_image_link
		self.platform = platform

		# The game could have multiple developers, so it's better to have a list
		self.developer = append_to_array(developer)

		if year != "-":
			self.year = int(year)
		else:
			self.year = year

		if completion_time != "-":
			self.completion_time = float(completion_time)
		else:
			self.completion_time = completion_time

		self.status = status

		# The game can have many genres, so it's better to have a list again
		self.genres = append_to_array(genres)

		self.all_achievements = all_achievements

		if score != "-":
			self.score = float(score)
		else:
			self.score = score

		if backloggd_score != "-":
			self.backloggd_score = float(backloggd_score)
		else:
			self.backloggd_score = backloggd_score
	
	def assign_id(self,id,is_reindexing = False):
		if self.id == -1 or is_reindexing:
			self.id = id
	
	def convert_to_row(self):
		return [
			self.name,
			self.cover_image_link,
			self.platform,
			"; ".join(self.developer),
			self.year,
			self.completion_time,
			self.status,
			"; ".join(self.genres),
			self.all_achievements,
			self.score,
			self.backloggd_score
		]

	def print_game_info(self):
		print("Name: " + self.name)
		print("Cover Image Link: " + self.cover_image_link)
		print("Platform: " + self.platform)
		print("Developer: " + str(self.developer))
		print("Year: " + str(self.year))
		print("Completion Time: " + str(self.completion_time))
		print("Status: " + self.status)
		print("Genres: " + str(self.genres))
		print("All Achievements: " + str(self.all_achievements))
		print("Score: " + str(self.score))
		print("Backloggd Score: " + str(self.backloggd_score))
		print()

	def to_dict(self):
		return {
			"name": self.name,
			"cover_image_link": self.cover_image_link,
			"platform": self.platform,
			"developer": self.developer,
			"year": self.year,
			"completion_time": self.completion_time,
			"status": self.status,
			"genres": self.genres,
			"all_achievements": self.all_achievements,
			"score": self.score,
			"backloggd_score": self.backloggd_score
		}