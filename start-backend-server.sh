#!/bin/bash

backend_pid_file="backlogger.pid"
log_file="backlogger.log"

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
}

cd backlogger-backend

# Check to ensure that not more than 1 backend server is running at a time
if [ -f "$backend_pid_file" ]; then
    echo "The backend server is already running with process ID $(cat $backend_pid_file), so will not start a new server"
    exit 1
fi

# TODO: Check if the virtual environment exists or not, if it doesn't exist, create a new virtual environment

# Activate the virtual environment
activate_virtual_environment

# Run the script
nohup python backlogger.py > "$log_file" 2>&1 &

echo $! > "$backend_pid_file"

echo "The backend server is running with process ID: $(cat $backend_pid_file)"