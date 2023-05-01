FROM ubuntu:latest

# install all dependencies
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get install -y wget && \
    apt-get install -y xz-utils && \
    apt-get install -y bash

# install nodejs latest version without package manager
RUN cd ./tmp && \
    wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz && \
    tar -xf node-v18.16.0-linux-x64.tar.xz && \
    mv node-v18.16.0-linux-x64 /usr/local/nodejs && \
    ln -s /usr/local/nodejs/bin/node /usr/bin/node && \
    ln -s /usr/local/nodejs/bin/npm /usr/bin/npm

# add files and config for spuga
COPY ./nginx.conf /etc/nginx/sites-available/streetbeatzlb
RUN ln -s /etc/nginx/sites-available/streetbeatzlb /etc/nginx/sites-enabled/

COPY startNginx.sh usr/local/startNginx.sh
RUN chmod +x usr/local/startNginx.sh

EXPOSE 80

CMD usr/local/startNginx.sh