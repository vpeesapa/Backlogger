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
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## Author
- Varun Peesapati

## About Backlogger
In this era where video games have been more accessible as ever and with numerous sales taking place throughout the year, a gamer's backlog has kept expanding with no end in sight to the point where a lot of games end up gathering dust in their libraries. At one point, it can get overwhelming for them to keep track of all those games.

Backlogger is a game tracking application that allows gamers to keep track of the games in their library worry-free. Backlogger also comes in-built with a recommender that helps suggests games from their backlog.

## Technologies Used
Backlogger is built on Python and Reactjs. Flask was used to create the backend application and necessary API routes. The frontend was built with components from Material UI.

## Installation and Setup
Backlogger's code is divided into two main components: the backend (found in `backlogger-backend`) and the frontend (found in `backlogger-frontend`).

### Backend Installation and Setup
To access the backend from the terminal (or Git BASH), run the following command:
```bash
$ cd backlogger-backend
```

Backlogger was tested on [Python 3.13.5](https://www.python.org/downloads/release/python-3135/) on Windows, but the basic installation and setup should be applicable to Linux and MacOs as well. If installing Python on Windows, ensure that it is also added to the system variables ([steps here](https://www.digitalocean.com/community/tutorials/install-python-windows-10)).

If you're trying to manage multiple versions of Python, I highly recommend [`pyenv`](https://github.com/pyenv/pyenv) (or [`pyenv-win`](https://github.com/pyenv-win/pyenv-win) for Windows) for seamless management of Python versions between projects.

___
#### Optional: Setup the Virtual Environment
For clean package management between projects, I also recommend creating a virtual environment for the project.

The virtual environment can be created and activated as follows:
```bash
$ python -m venv .venv          # Creates the virtual environment

$ source .venv/bin/activate     # For MacOS/Linux
  OR
$ source .venv/Scripts/activate # For Windows
```

To deactivate it, simply run:
```bash
$ deactivate
```
___

The `requirements.txt` found here contains all the packages that the backend application has dependencies with. For a quick installation of all packages, run:
```bash
$ pip install -r requirements.txt
```

To start the backend application, run this command:
```bash
$ python backlogger.py
```

With this, the backend application would be running on **port 8089**, which you can either verify through [Postman](https://www.postman.com/) or a web browser of your choice using the endpoints mentioned in the following section.

### Frontend Setup and Installation

## API endpoints

## Future Improvements

## Credits
All images for the games displayed were taken from [backloggd.com](https://backloggd.com/). Similarly, completion times were taken from [howlongtobeat.com](https://howlongtobeat.com/).