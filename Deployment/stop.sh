#!/bin/bash

# check if USE_PROXY in ./Environment/.env file is set to true, if so, stop proxy
if [ "$(grep -E "^USE_PROXY=true$" ./Environment/.env)" ]; then
  echo "Stopping proxy"
  docker-compose --file ./ReverseProxy/docker-compose.yml --env-file ./Environment/.env down --rmi all
fi

docker-compose --env-file ./Environment/.env down --rmi all