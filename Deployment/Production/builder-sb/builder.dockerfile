FROM ubuntu:latest

# Mounte die Volumes im Container
VOLUME /builds
VOLUME /backend
VOLUME /frontend

# install all dependencies
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y unzip && \
    apt-get install -y xz-utils && \
    apt-get install -y bash

# install nodejs latest version without package manager
RUN cd ./tmp && \
    wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz && \
    tar -xf node-v18.16.0-linux-x64.tar.xz && \
    mv node-v18.16.0-linux-x64 /usr/local/nodejs && \
    ln -s /usr/local/nodejs/bin/node /usr/bin/node && \
    ln -s /usr/local/nodejs/bin/npm /usr/bin/npm

# install gradle
RUN cd ./tmp && \
    wget https://services.gradle.org/distributions/gradle-8.1.1-bin.zip && \
    unzip gradle-8.1.1-bin.zip && \
    mv gradle-8.1.1 /usr/local/gradle && \
    ln -s /usr/local/gradle/bin/gradle /usr/bin/gradle

# install java
RUN apt-get install -y openjdk-17-jdk

# install angular cli
RUN npm install -g @angular/cli

COPY build_project.sh /usr/build_project.sh
RUN chmod +x /usr/build_project.sh

ENTRYPOINT /usr/build_project.sh