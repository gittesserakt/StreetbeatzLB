FROM nginx:latest

VOLUME /ssl

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl /etc/nginx/ssl/hjetter