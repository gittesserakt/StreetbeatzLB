FROM nginx:latest

VOLUME /certs

RUN apt-get update && \
    apt-get install -y bash

COPY nginx-rp.conf /etc/nginx/conf.d/default.conf.template
COPY start_nginx.sh /docker-entrypoint.d/start_nginx.sh
RUN chmod +x /docker-entrypoint.d/start_nginx.sh