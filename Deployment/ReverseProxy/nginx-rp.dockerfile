FROM nginx:latest

VOLUME /certs

RUN apt-get update && \
    apt-get install -y bash

COPY index.html /usr/share/nginx/html
COPY nginx-rp.conf /etc/nginx/conf.d/default.conf