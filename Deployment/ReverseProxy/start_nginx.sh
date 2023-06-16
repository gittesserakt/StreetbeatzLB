#!/bin/bash

# if PUBLIC_DB_ACCESS is set to true, replace environment variables in nginx stream config
if [ "$PUBLIC_DB_ACCESS" = "true" ]; then
  # multiline string for nginx stream config
  stream_config="stream {
    server {
      listen 3306;
      proxy_pass $SERVER_LAN_IP:$DB_PORT;
    }
  }"

  #insert multiline stream config string into nginx.conf at line 12
  sed -i "12i $stream_config" /etc/nginx/nginx.conf
fi