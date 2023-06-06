#!/bin/bash

function main {
  # check if the script gets a parameter
  if [ $# -eq 0 ]
    then
      echo $1
      log 3 "No arguments supplied"
      exit 1
  fi

  # check if only one parameter is passed
  if [ "$#" -gt 1 ]
    then
      log 3 "Only one argument is allowed"
      exit 1
  fi

  # global variables
  project_path=$PWD

  # check which parameter is passed and call the appropriate function
  if [ $1 == "init" ]
    then
      log 1 "Initializing"
      log 1 "Project path: $project_path"
      init
  elif [ $1 == "build" ]
    then
      log 1 "Building"
      log 1 "Project path: $project_path"
      build
  elif [ $1 == "start" ]
    then
      log 1 "Starting"
      log 1 "Project path: $project_path"
      start
  elif [ $1 == "stop" ]
    then
      log 1 "Stopping"
      log 1 "Project path: $project_path"
      stop
  elif [ $1 == "help" ]
    then
      echo "Usage: ./streetbeatzlb_prod.sh [init|build|start|stop]"
      echo "  init: Initialize the project"
      echo "  build: Build the project"
      echo "  start: Start the project"
      echo "  stop: Stop the project"
      echo "  help: Show this help message"
      echo "For more information, please check the README.md file"
  else
    log 3 "Invalid argument"
    exit 1
  fi
}

# function to initialize the project
function init {
  cp $project_path/Deployment/Environment/env_template $project_path/Deployment/Environment/.env

  # overwrite the first line in the .env file with PROJECT_PATH=$project_path
  sed -i "1s|.*|PROJECT_PATH=$project_path|" "$project_path/Deployment/Environment/.env"

  log 2 "Please edit the .env file in the Environment folder"
}

# function to build the project
function build {
  # check if .env file exists
  if [ ! -f $prject_path/Deployment/Environment/.env ]; then
    log 3 "No .env file found"
    exit 1
  fi

  # clear the frontend and backend folders if they have content
  if [ "$(ls -A $project_path/Deployment/Builds/frontend)" ]; then
    log 1 "Clearing frontend folder"
    rm -rf $project_path/Deployment/Builds/frontend/*
  fi
  if [ "$(ls -A $project_path/Deployment/Builds/backend)" ]; then
    log 1 "Clearing backend folder"
    rm -rf $project_path/Deployment/Builds/backend/*
  fi

  log 1 "Building project"
  docker-compose --file $project_path/Deployment/Production/builder-sb/docker-compose.yml --env-file $project_path/Deployment/Environment/.env up --build

  docker-compose --file $project_path/Deployment/Production/builder-sb/docker-compose.yml --env-file $project_path/Deployment/Environment/.env down --rmi all

  # check if project failed by checking if the frontend and backend folders have content
  if [ ! "$(ls -A $project_path/Deployment/Builds/frontend)" ] || [ ! "$(ls -A $project_path/Deployment/Builds/backend)" ]; then
    log 3 "Project build failed"
    exit 1
  fi

  # check if certs folder already has links to certs, if so, delete them
  if [ "$(ls -A $project_path/Deployment/ReverseProxy/certs)" ]; then
    log 1 "Deleting links to certs"
    rm -rf $project_path/Deployment/ReverseProxy/certs/*
  fi

  # check if USE_PROXY in ./Environment/.env file is set to true, if so, create link to certs
  if [ "$(grep -E "^USE_PROXY=true$" $prject_path/Deployment/Environment/.env)" ]; then
    log 1 "Creating links to certs"
    mkdir $project_path/Deployment/ReverseProxy/certs

    # get absolute path to .pem cert from .env file (PATH_SSL_CERT_PEM) and create link to it
    pem_path=$(grep -E "^PATH_SSL_CERT_PEM=" $prject_path/Deployment/Environment/.env | cut -d '=' -f2)
    ln -s pem_path $project_path/Deployment/ReverseProxy/certs/ssl_cert.pem

    # get absolute path to .key cert from .env file (PATH_SSL_CERT_KEY) and create link to it
    key_path=$(grep -E "^PATH_SSL_CERT_KEY=" $prject_path/Deployment/Environment/.env | cut -d '=' -f2)
    ln -s key_path $project_path/Deployment/ReverseProxy/certs/ssl_cert.key
  fi
}

# function to start the project
function start {
  # check if USE_PROXY in ./Environment/.env file is set to true, if so, start proxy
  if [ "$(grep -E "^USE_PROXY=true$" $project_path/Deployment/Environment/.env)" ]; then
    log 1 "Starting proxy"
    docker-compose --file $project_path/Deployment/ReverseProxy/docker-compose.yml --env-file $project_path/Deployment/Environment/.env up --build --detach
  fi

  log 1 "Starting project"
  docker-compose --env-file $project_path/Deployment/Environment/.env up --detach --build
}

# function to stop the project
function stop {
  # check if USE_PROXY in ./Environment/.env file is set to true, if so, stop proxy
  if [ "$(grep -E "^USE_PROXY=true$" $project_path/Deployment/Environment/.env)" ]; then
    log 1 "Stopping proxy"
    docker-compose --file $project_path/Deployment/ReverseProxy/docker-compose.yml --env-file $project_path/Deployment/Environment/.env down --rmi all
  fi

  log 1 "Stopping project"
  docker-compose --env-file $project_path/Deployment/Environment/.env down --rmi all
}

# function to log messages to a console
function log {
  local log_type="$1"
  local message="$2"
  local datetime=$(date +"%Y-%m-%d %H:%M:%S")

  case "$log_type" in
    1)
      log_type="INFO"
      ;;
    2)
      log_type="WARNING"
      ;;
    3)
      log_type="ERROR"
      ;;
    *)
      log_type="UNKNOWN"
      ;;
  esac

  local log_entry="[$datetime] $log_type: $message"

  echo "$log_entry"
}

main $@