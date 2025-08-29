#!/bin/bash

BACKEND_PID_FILE="backlogger.pid"

script_directory=$(dirname "$(realpath "$0")")
current_directory=$(pwd)

if [ "$script_directory" != "$current_directory" ]; then
    echo "You must be in the script's directory to run it! Aborting..."
    exit 1
fi

cd backlogger-backend

if [ ! -f "$BACKEND_PID_FILE" ]; then
    echo "There is no instance of the backend server running, so nothing will happen."
    exit 1
fi

backend_pid=$(cat "$BACKEND_PID_FILE")

echo "Stopping the backend server with PID: $backend_pid..."
kill "$backend_pid"

if [ "$?" -eq 0 ]; then
    echo "The backend server was successfully stopped!"
else
    echo "There was an issue while stopping the backend server. Aborting..."
    exit 1
fi

# Deleting the .pid file to indicate that the backend server is no longer running
rm -rf "$BACKEND_PID_FILE"