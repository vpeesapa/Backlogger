#!/bin/bash

backend_pid_file="backlogger.pid"
log_file="backlogger.log"

cd backlogger-backend

# TODO: Check if the virtual environment exists or not, if it doesn't exist, create a new virtual environment

# Activate the virtual environment
# TODO: Add logic to activate the virtual environment for different OSes
source .venv/Scripts/activate

# Run the script
# TODO: Start the backend server in the background
nohup python backlogger.py > "$log_file" 2>&1 &

echo $! > "$backend_pid_file"

echo "The backend server is running with process ID: $(cat $backend_pid_file)"