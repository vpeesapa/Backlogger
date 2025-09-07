def append_to_array(string_of_items):
	return string_of_items.split("; ")

def add_game_to_dict(game_dict,key,games_info):
	# Initialize the list if the key does not exist
	if key not in game_dict:
		game_dict[key] = []
	
	game_dict[key].append(games_info)

def check_key_in_dict(game_dict,key):
	
	return key in game_dict