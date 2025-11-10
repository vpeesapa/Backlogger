#!/bin/bash

FRONTEND_PID_FILE="frontend.pid"

script_directory=$(dirname "$(realpath "$0")")
current_directory=$(pwd)

if [ "$script_directory" != "$current_directory" ]; then
    echo "You must be in the script's directory to run it! Aborting..."
    exit 1
fi

cd backlogger-frontend

if [ ! -f "$FRONTEND_PID_FILE" ]; then
    echo "There is no instance of the frontend application running, so nothing will happen."
    exit 1
fi

frontend_pid=$(cat "$FRONTEND_PID_FILE")

echo "Stopping the frontend application with PID: $frontend_pid..."
taskkill //PID "$frontend_pid" //F > /dev/null

if [ "$?" -eq 0 ]; then
    echo "The frontend application was successfully stopped!"
else
    echo "There was an issue while stopping the frontend application. Aborting..."
    exit 1
fi

# Deleting the .pid file to indicate that the frontend application is no longer running
rm -rf "$FRONTEND_PID_FILE"