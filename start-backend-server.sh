#!/bin/bash

BACKEND_PID_FILE="backlogger.pid"
LOG_FILE="backlogger.log"
VENV_FILE=".venv"
REQUIREMENTS_FILE="requirements.txt"

function activate_virtual_environment() {
    case "$OSTYPE" in
        linux-gnu*)
            echo "Running on Linux..."
            source .venv/bin/activate
            ;;
        darwin*)
            echo "Running on MacOS..."
            source .venv/bin/activate
            ;;
        cygwin*)
            echo "Running on Windows (via Cygwin)..."
            source .venv/Scripts/activate
            ;;
        msys*)
            echo "Running on Windows (via MINGW/MSYS)..."
            source .venv/Scripts/activate
            ;;
        *)
            echo "Unknown OS: $OSTYPE. Aborting..."
            exit 1
            ;;
    esac

    echo ""
}

function create_virtual_environment() {
    if [ -d "$VENV_FILE" ]; then
        echo "$VENV_FILE already exists in the current directory. Proceeding to use it..."
        echo ""

        # Directly activate the virtual environment here as .venv already exists in the directory
        activate_virtual_environment

        return
    fi

    echo "$VENV_FILE does not exist in the current directory. Creating a new virtual environment..."
    echo ""

    python -m venv "$VENV_FILE"

    if [ "$?" -eq 0 ]; then
        echo "$VENV_FILE was successfully created! Activating the virtual environment..."
        echo ""

        # Activate the virtual environment
        activate_virtual_environment

        echo "The virtual environment was successfully activated! Installing all packages from $REQUIREMENTS_FILE..."
        echo ""

        pip install -r "$REQUIREMENTS_FILE"
    else
        echo "Encountered an error when creating the virtual environment. Aborting..."
        exit 1
    fi

    echo ""
}

script_directory=$(dirname $(realpath "$0"))
current_directory=$(pwd)

if [ "$script_directory" != "$current_directory" ]; then
    echo "You must be in the script's directory to run it! Aborting..."
    exit 1
fi

cd backlogger-backend

# Check to ensure that not more than 1 backend server is running at a time
if [ -f "$BACKEND_PID_FILE" ]; then
    echo "The backend server is already running with process ID $(cat $BACKEND_PID_FILE), so will not start a new server!"
    exit 1
fi

# Create the virtual environment if it doesn't exist
create_virtual_environment

# Run the script
nohup python backlogger.py > "$LOG_FILE" 2>&1 &

echo $! > "$BACKEND_PID_FILE"

echo "The backend server is running with process ID: $(cat $BACKEND_PID_FILE)"