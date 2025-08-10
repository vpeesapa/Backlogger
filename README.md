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
  - [GET /games_on_platform/<platform>](#get-games_on_platform)
  - [GET /all_games_by_status](#get-all_games_by_status)
  - [GET /games_by_status/<status>](#get-games_by_status)
  - [POST /recommend](#post-recommend)
  - [GET /games_distribution_per_status](#get-games_distribution_per_status)
  - [GET /games-distribution_per_platform](#get-games-distribution_per_platform)
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

Backlogger was tested on [Python 3.13.5](https://www.python.org/downloads/release/python-3135/) on Windows, but the basic installation and setup should be applicable to Linux and MacOs as well. If installing Python on Windows, ensure that it is also added to the system variables ([steps here](https://www.digitalocean.com/community/tutorials/install-python-windows-10)).

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

With this, the backend application would be running on **port 8089**, which you can either verify through [Postman](https://www.postman.com/) or a web browser of your choice using the endpoints mentioned in the following section.

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

The frontend server will start on **port 3000** and can be verified with any web browser.

## API Endpoints
### GET /games_by_platform
**Description**: Returns all games filtered by the platform.

**cURL**:
```cURL
curl --location 'localhost:8090/games_by_platform'
```

**HTTP Response Codes**:
- **200 OK**: Successfully fetched all games filtered by the platform.

### GET /games_on_platform/<platform>
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

### GET /games_by_status/<status>
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

**Query Parameters**:
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

## Future Improvements
- Improve frontend styling to be more responsive on different displays.
- Modularize backend logic into smaller scripts in compliance with modern standards.
- Create a start up script to automatically run the backend server.
  - Extend the script's functionality so that the initial setup can also be done through this script.
- Add CRUD functionalities:
  - Allow users to add new entries that will also be saved in the spreadsheet.
  - Allow users to update existing entries and saved in the spreadsheet.
- Centralize error handling in the backend.

## Credits
All images for the games displayed were taken from [backloggd.com](https://backloggd.com/). Similarly, completion times were taken from [howlongtobeat.com](https://howlongtobeat.com/).