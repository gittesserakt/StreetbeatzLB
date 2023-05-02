FROM nginx:latest

COPY startNginx.sh docker-entrypoint.d/startNginx.sh
COPY ./nginx.conf /etc/nginx/conf.d/default.conf