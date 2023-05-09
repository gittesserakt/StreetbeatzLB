FROM node:alpine

# Mounte die Volumes im Container
VOLUME /data

# install dependencies
RUN apk add --update openjdk17-jdk bash git # wget unzip xz

# install angular cli
RUN npm install -g @angular/cli

COPY builder-sb/build_project.sh /usr/local/build_project.sh
RUN chmod +x /usr/local/build_project.sh

ENTRYPOINT /usr/local/build_project.sh