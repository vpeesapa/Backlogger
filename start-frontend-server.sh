#!/bin/bash

FRONTEND_PID_FILE="frontend.pid"
LOG_FILE="frontend.log"
FRONTEND_PORT=3000

script_directory=$(dirname "$(realpath "$0")")
current_directory=$(pwd)

if [ "$script_directory" != "$current_directory" ]; then
    echo "You must be in the script's directory to run it! Aborting..."
    exit 1
fi

cd backlogger-frontend

# Check to ensure that not more than 1 frontend application is running at a time
if [ -f "$FRONTEND_PID_FILE" ]; then
    echo "The frontend application is already running with process ID $(cat $FRONTEND_PID_FILE), so will not start a new server!"
    exit 1
fi

# Attempt to start the frontend application
nohup bash -c "PORT=${FRONTEND_PORT} npm start" > "$LOG_FILE" 2>&1 &

echo "Starting the frontend application..."
sleep 10

pid=$(netstat -ano | grep LISTENING | grep :3000 | awk '{print $5}')

if tasklist //FI "PID eq $pid" > /dev/null; then
    echo "$pid" > "$FRONTEND_PID_FILE"

    echo "The frontend application is running with process ID: $pid"
else
    echo "Something went wrong when starting the frontend application. Check $LOG_FILE for more details"
fi