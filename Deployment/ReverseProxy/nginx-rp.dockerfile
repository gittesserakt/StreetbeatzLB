FROM nginx:latest

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

COPY nginx-rp.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html

#COPY startNginx.sh /usr/share/nginx/startNginx.sh
#RUN chmod +x /usr/share/nginx/startNginx.sh

#ENTRYPOINT ["/usr/share/nginx/startNginx.sh"]
#CMD ["nginx", "-g", "daemon off;"]