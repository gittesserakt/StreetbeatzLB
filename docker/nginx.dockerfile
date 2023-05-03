FROM nginx:latest

VOLUME /data

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./data/hjetter.key /etc/nginx/ssl/hjetter
COPY ./data/hjetter_ddns_net.pem /etc/nginx/ssl/hjetter