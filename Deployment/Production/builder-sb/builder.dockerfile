FROM node:alpine

# Mounte die Volumes im Container
VOLUME /data

# install dependencies
RUN apk add --update openjdk17-jdk bash

# install angular cli
RUN npm install -g @angular/cli

COPY build_project.sh /usr/local/build_project.sh
RUN chmod +x /usr/local/build_project.sh

ENTRYPOINT /usr/local/build_project.sh