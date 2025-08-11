#!/bin/bash

backend_pid_file="backlogger.pid"

cd backlogger-backend

if [ ! -f "$backend_pid_file" ]; then
    echo "There is no instance of the backend server running, so nothing will happen."
    exit 1
fi

backend_pid=$(cat "$backend_pid_file")

echo "Stopping the backend server with PID: $backend_pid..."
kill "$backend_pid"

if [ "$?" -eq 0 ]; then
    echo "The backend server was successfully stopped!"
else
    echo "There was an issue while stopping the backend server. Aborting..."
    exit 1
fi

# Deleting the .pid file to indicate that the backend server is no longer running
rm -rf "$backend_pid_file"