# Backlogger

## Author
* Varun Peesapati

## About Backlogger
In this era where video games have been more accessible as ever and with numerous sales taking place throughout the year, a gamer's backlog has kept expanding with no end in sight to the point where a lot of games end up gathering dust in their libraries. At one point, it can get overwhelming for them to keep track of all those games.

Backlogger is a game tracking application that allows gamers to keep track of the games in their library worry-free. Backlogger also comes in-built with a recommender that helps suggests games from their backlog.

## Technologies Used
Backlogger is built on Python and Reactjs. Flask was used to create the backend application and necessary API routes. The frontend was built with components from Material UI.

## Installation and Setup
Backlogger was tested on [Python 3.13.5](https://www.python.org/downloads/release/python-3135/) on Windows, but the basic installation and setup should be applicable to Linux and MacOs as well. If installing Python on Windows, ensure that it is also added to the system variables ([steps here](https://www.digitalocean.com/community/tutorials/install-python-windows-10)).

If you're trying to manage multiple versions of Python, I highly recommend [`pyenv`](https://github.com/pyenv/pyenv) (or [`pyenv-win`](https://github.com/pyenv-win/pyenv-win) for Windows) for seamless management of Python versions between projects.

### Optional: Setup the Virtual Environment
For clean package isolation between projects, I also recommend creating a virtual environment for the project.

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

## Future Improvements

## Credits
All images for the games displayed were taken from [backloggd.com](https://backloggd.com/). Similarly, completion times were taken from [howlongtobeat.com](https://howlongtobeat.com/).