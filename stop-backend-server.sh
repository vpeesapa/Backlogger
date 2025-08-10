#!/bin/bash

backend_pid_file="backlogger.pid"

cd backlogger-backend

backend_pid=$(cat "$backend_pid_file")

kill "$backend_pid"

rm -rf "$backend_pid_file"