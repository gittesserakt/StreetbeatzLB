FROM nginx:latest

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash && \
    apt-get install -y curl

COPY nginx.conf /etc/nginx/conf.d/default.conf