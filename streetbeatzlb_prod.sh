#!/bin/bash

# check if the script gets a parameter
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 1
fi

# check if only one parameter is passed
if [ $# -gt 1 ]
  then
    echo "Only one argument is allowed"
    exit 1
fi

# check which parameter is passed and call the appropriate script
if [ $1 == "init" ]
  then
    echo "Initializing"
    ./Deployment/init.sh
elif [ $1 == "build" ]
  then
    echo "Building"
    ./Deployment/build.sh
elif [ $1 == "start" ]
  then
    echo "Starting"
    ./Deployment/start.sh
elif [ $1 == "stop" ]
  then
    echo "Stopping"
    ./Deployment/stop.sh
else
  echo "Invalid argument"
  exit 1
fi