#!/bin/bash

# check if .env file exists
if [ ! -f ./Environment/.env ]; then
  echo "No .env file found"
  exit 1
fi

# check if USE_PROXY in ./Environment/.env file is set to true, if so, create link to certs
if [ "$(grep -E "^USE_PROXY=true$" ./Environment/.env)" ]; then
  echo "Creating link to certs"
  mkdir ./ReverseProxy/certs

  # get absolute path to .pem cert from .env file (PATH_SSL_CERT_PEM) and create link to it
  pem_path=$(grep -E "^PATH_SSL_CERT_PEM=" ./Environment/.env | cut -d '=' -f2)
  ln -s pem_path ./ReverseProxy/certs/ssl_cert.pem

  # get absolute path to .key cert from .env file (PATH_SSL_CERT_KEY) and create link to it
  key_path=$(grep -E "^PATH_SSL_CERT_KEY=" ./Environment/.env | cut -d '=' -f2)
  ln -s ../Environment/hjetter.key ./ReverseProxy/certs/ssl_cert.key
fi

docker-compose --file ./Production/builder-sb/docker-compose.yml --env-file ./Environment/.env up --build

docker-compose --file ./Production/builder-sb/docker-compose.yml --env-file ./Environment/.env down --rmi all