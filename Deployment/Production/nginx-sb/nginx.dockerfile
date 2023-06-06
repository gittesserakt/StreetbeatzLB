FROM nginx:latest

COPY nginx-sb/nginx.conf /etc/nginx/conf.d/default.conf