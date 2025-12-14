# Backlogger

## Table of Contents
- [Author](#author)
- [About Backlogger](#about-backlogger)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
  - [Backend Installation and Setup](#backend-installation-and-setup)
    - [Optional: Setup the Virtual Environment](#optional-setup-the-virtual-environment)
  - [Frontend Installation and Setup](#frontend-setup-and-installation)
- [API Endpoints](#api-endpoints)
  - [GET /games_by_platform](#get-games_by_platform)
  - [GET /games_on_platform/\<platform\>](#get-games_on_platformplatform)
  - [GET /all_games_by_status](#get-all_games_by_status)
  - [GET /games_by_status/\<status\>](#get-games_by_statusstatus)
  - [POST /recommend](#post-recommend)
  - [GET /games_distribution_per_status](#get-games_distribution_per_status)
  - [GET /games-distribution_per_platform](#get-games-distribution_per_platform)
  - [POST /add_game](#post-add_game)
  - [POST /edit_game/\<id\>](#post-edit_gameid)
  - [DELETE /delete_game/\<id\>](#delete-delete_gameid)
  - [GET /search/\<query\>](#get-searchquery)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## Author
- Varun Peesapati

## About Backlogger
In this era where video games have been more accessible as ever and with numerous sales taking place throughout the year, a gamer's backlog has kept expanding with no end in sight to the point where a lot of games end up gathering dust in their libraries. At one point, it can get overwhelming for them to keep track of all those games.

Backlogger is a game tracking application that allows gamers to keep track of the games in their library worry-free. Backlogger also comes in-built with a recommender that helps suggests games from their backlog.

## Technologies Used
Backlogger is built on Python and Reactjs. Flask was used to create the backend application and necessary API routes. The frontend was built with components from Material UI. The data is saved inside a Google Sheets spreadsheet and is accessed by the backend application during the initial setup.

## Installation and Setup
Backlogger's code is divided into two main components: the backend (found in `backlogger-backend`) and the frontend (found in `backlogger-frontend`).

### Backend Installation and Setup
To access the backend from the terminal (or Git BASH), run the following command:
```bash
cd backlogger-backend
```

Backlogger was tested on [Python 3.13.5](https://www.python.org/downloads/release/python-3135/) on Windows, but the basic installation and setup should be applicable to Linux and MacOS as well. If installing Python on Windows, ensure that it is also added to the system variables ([steps here](https://www.digitalocean.com/community/tutorials/install-python-windows-10)).

If you're trying to manage multiple versions of Python, I highly recommend [`pyenv`](https://github.com/pyenv/pyenv) (or [`pyenv-win`](https://github.com/pyenv-win/pyenv-win) for Windows) for seamless management of Python versions between projects.

___
#### Optional: Setup the Virtual Environment
For clean package management between projects, I also recommend creating a virtual environment for the project.

The virtual environment can be created and activated as follows:
```bash
python -m venv .venv          # Creates the virtual environment

source .venv/bin/activate     # For MacOS/Linux
  OR
source .venv/Scripts/activate # For Windows
```

To deactivate it, simply run:
```bash
deactivate
```
___

The `requirements.txt` found here contains all the packages that the backend application has dependencies with. For a quick installation of all packages, run:
```bash
pip install -r requirements.txt
```

To start the backend application, run this command:
```bash
python backlogger.py
```
___
**Update**: As of 30th August 2025, with the backend now broken into smaller, modular scripts, simply running `python backlogger.py` won't work as expected. Instead, run the following the following script to seamlessly start the backend server in the background:
```bash
./start-backend-server.sh
```

With this, the backend application would be running on **port 8089**, which you can either verify through [Postman](https://www.postman.com/) or a web browser of your choice using the endpoints mentioned in the following section.

The following script will stop the backend server, if running:
```bash
./stop-backend-server.sh
```

**Note**: `start-backend-server.sh` and `stop-backend-server.sh` will only run from the `Backlogger` directory.

In case some debugging has to be done and the runner script (i.e. `backlogger.py`) has to be run, add the following snippet to it:
```Python
if __name__ == "__main__":
    app.run(debug=True,port=8089)
```
___

### Frontend Setup and Installation
Similarly, the frontend is accessible from the terminal (or Git BASH) with the following command:
```bash
cd backlogger-frontend
```

As mentioned earlier, Backlogger's frontend runs on Reactjs, so [**Node.js**](https://nodejs.org/en) and [**npm**](https://www.npmjs.com/) are a requirement in order to run it. The frontend was tested on Node.js `v22.17.1` and npm `v11.4.2`.

**Note**: Both `Node.js` and `npm` can be installed from here: https://nodejs.org/en/download.

Internally, the frontend uses some packages to render different components. To install all the packages, run the following command:
```bash
npm install
```

To start the frontend server, run:
```bash
npm start
```

___
**Update**: As of 10th November 2025, the frontend application can be also easily started in the background by running the following command:
```bash
./start-frontend-server.sh
```

Similarly, to stop the application, run:
```bash
./stop-frontend-server.sh
```

**Note**: These scripts do not install any new packages, so it is important to run `npm install` whenever necessary.
___

Regardless of the method used, the frontend application will start on **port 3000** and can be verified with any web browser.

## API Endpoints
### GET /games_by_platform
**Description**: Returns all games filtered by the platform.

**cURL**:
```cURL
curl --location 'localhost:8090/games_by_platform'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched all games filtered by the platform.

### GET /games_on_platform/\<platform\>
**Description**: Returns the list of games belonging to a particular platform.

**Query Parameters**:
- `platform`: The platform that the games should belong to.

**cURL**:
```cURL
curl --location 'localhost:8090/games_on_platform/xbox_game_pass'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched the list of games on that platform.
- **400 ERROR**: Invalid value for `platform` was passed.

### GET /all_games_by_status
**Description**: Returns all games filtered by their status (i.e Backlog, Complete, etc.).

**cURL**:
```cURL
curl --location 'localhost:8090/all_games_by_status'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched all games filtered by their status.

### GET /games_by_status/\<status\>
**Description**: Returns the list of games with the specified completion status.

**Query Parameters**:
- `status`: The completion status of the games.

**cURL**:
```cURL
curl --location 'localhost:8090/games_by_status/wishlist'
```

**HTTP Response Codes**:
- **200 OK**": Successfully fetched the list of games with the specified completion status.
- **400 ERROR**: Invalid value for `status` was passed.

### POST /recommend
**Description**: Recommends a certain number of games based on the platform and completion status.

**Request Header**:
- `platform`: The platform of the games to query.
- `status`: The completion status of the games to query.
- `numRecommended`: The number of games to recommend matching the criteria.

**cURL**:
```cURL
curl --location 'localhost:8090/recommend' \
--header 'Content-Type: application/json' \
--data '{
    "platform": "steam",
    "status": "wishlist",
    "numRecommended": 32
}'
```

**HTTP Response Codes**:
- **200 OK**: Successfully recommends games based on the input criteria.
- **400 ERROR**: Invalid values given in the input criteria.
- **403 ERROR**: Missing keys inside the request parameter.
- **404 ERROR**: No data was passed by the request.

### GET /games_distribution_per_status
**Description**: Returns the distribution of games based on their completion status.

**cURL**:
```cURL
curl --location 'localhost:8090/games_distribution_per_status'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched the distribution of games based on their completion status.

### GET /games-distribution_per_platform
**Description**: Returns the distribution of games based on their platform.

**cURL**:
```cURL
curl --location 'localhost:8090/games_distribution_per_platform'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched the distribution of games based on their platform.

### POST /add_game
**Description**: Adds a new game to the spreadsheet

**Request Header**:
- `all_achievements`: Obtained all the achievements in the new game.
- `completion_time`: Average time taken to beat the new game (based on [howlongtobeat.com]()).
- `cover_image_link`: Image to be used as the cover in the application (taken from [backloggd.com]()).
- `developer`: The developers of the new game.
- `genres`: The genres of the new game.
- `name`: The name of the new game.
- `platform`: The platform of the new game.
- `score`: The score of the new game.
- `status`: The status of the new game.
- `year`: The release year of the new game.

**cURL**:
```cURL
curl --location 'localhost:8090/add_game' \
--header 'Content-Type: application/json' \
--data '{
    "all_achievements": false,
    "completion_time": 12.0,
    "cover_image_link": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wy4.jpg",
    "developer": [
        "test_dev"
    ],
    "genres": [
        "test_genre"
    ],
    "name": "test_game",
    "platform": "steam",
    "score": 7.5,
    "status": "wishlist",
    "year": 2021
}'
```

**HTTP Response Codes**:
- **200 OK**: Successfully added the new game to the spreadsheet.
- **400 ERROR**: Missing keys inside the request parameter.
- **402 ERROR**: Failed to add the new game's information inside the spreadsheet.

### POST /edit_game/\<id\>
**Description**: Edits a game and saves the updated information inside the spreadsheet.

**Query Parameters**:
- `id`: The ID of the game that should be updated.

**Request Header**:
- `all_achievements`: Obtained all the achievements in the game.
- `completion_time`: Average time taken to beat the game (based on [howlongtobeat.com]()).
- `cover_image_link`: Image to be used as the cover in the application (taken from [backloggd.com]()).
- `developer`: The developers of the game.
- `genres`: The genres of the game.
- `name`: The name of the game.
- `platform`: The platform of the game.
- `score`: The score of the game.
- `status`: The status of the game.
- `year`: The release year of the game.

**cURL**:
```cURL
curl --location 'localhost:8090/edit_game/202' \
--header 'Content-Type: application/json' \
--data '{
    "all_achievements": false,
    "completion_time": 11.0,
    "cover_image_link": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wy4.jpg",
    "developer": [
        "test_dev1",
        "test_dev2"
    ],
    "genres": [
        "test_genre",
        "Action"
    ],
    "name": "test_game",
    "platform": "steam",
    "score": 3,
    "status": "complete",
    "year": 2021
}'
```

**HTTP Response Codes**:
- **200 OK**: The game was successfully updated in the spreadsheet.
- **400 ERROR**: Missing keys inside the request parameter.
- **405 ERROR**: Failed to update the game's information inside the spreadsheet.
- **406 ERROR**: Attempted to update an out-of-range row.

### DELETE /delete_game/\<id\>
**Description**: Deletes a game from the spreadsheet.

**Query Parameters**:
- `id`: The ID of the game that should be deleted.

**cURL**:
```cURL
curl --location --request DELETE 'localhost:8090/delete_game/202'
```

**HTTP Response Codes**:
- **200 OK**: The game was successfully deleted from the spreadsheet.
- **406 ERROR**: Attempted to delete an out-of-range row.
- **407 ERROR**: Failed to delete the game from the spreadsheet.

### GET /search/\<query\>
**Description**: Searches for a game in the spreadsheet.

**Query Parameters**:
- `query`: The search query matching the name of a game.

**cURL**:
```cURL
curl --location 'localhost:8090/search/ghost of'
```

**HTTP Response Codes**:
- **200 OK**: The game was successfully found in the spreadsheet.
- **408 ERROR**: Search query was an empty string.

## Future Improvements
- Improve frontend styling to be more responsive on different displays.
- ~~Frontend should only fetch games from the selected category instead of all of them when the application loads for the first time.~~
- ~~When adding, editing, or deleting a game, the frontend should refresh the data displaying in the selected category instead of reloading the page.~~
- ~~Modularize backend logic into smaller scripts in compliance with modern standards.~~
- ~~Create a start up script to automatically run the backend server.~~
  - ~~Extend the script's functionality so that the initial setup can also be done through this script.~~
- ~~Create a start up script to automatically run the frontend server~~.
- ~~Add CRUD functionalities~~:
  - ~~Allow users to add new entries that will also be saved in the spreadsheet~~.
  - ~~Allow users to update existing entries and save those changes in the spreadsheet~~.
  - ~~Allow users to delete existing entries from the spreadsheet~~
- ~~Implement a search functionality to find games in the spreadsheet.~~
  - ~~Enable searched games to be edited or deleted.~~
- ~~Centralize error handling in the backend.~~
- Add a proxy server to handle frontend requests without dealing with CORS middleware issues.

## Credits
All images for the games displayed were taken from [backloggd.com](https://backloggd.com/). Similarly, completion times were taken from [howlongtobeat.com](https://howlongtobeat.com/).