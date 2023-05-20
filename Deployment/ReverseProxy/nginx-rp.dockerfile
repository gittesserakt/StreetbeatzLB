FROM nginx:latest

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

COPY nginx-rp.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY maintenance.html /usr/share/nginx/html/maintenance/maintenance.html