FROM nginx:latest

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

COPY nginx-sb/nginx.conf /etc/nginx/conf.d/default.conf