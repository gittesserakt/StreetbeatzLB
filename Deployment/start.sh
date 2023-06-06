#!/bin/bash

# check if USE_PROXY in ./Environment/.env file is set to true, if so, start proxy
if [ "$(grep -E "^USE_PROXY=true$" ./Environment/.env)" ]; then
  echo "Starting proxy"
  docker-compose --file ./ReverseProxy/docker-compose.yml --env-file ./Environment/.env up --build --detach
fi

docker-compose --env-file ./Environment/.env up --detach --build