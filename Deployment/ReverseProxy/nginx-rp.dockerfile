FROM nginx:latest

VOLUME /certs

RUN apt-get update && \
    apt-get install -y bash

COPY nginx-rp.conf /etc/nginx/conf.d/default.conf