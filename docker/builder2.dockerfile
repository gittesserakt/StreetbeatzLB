FROM node:20-apline

# Mounte die Volumes im Container
VOLUME /builds
VOLUME /backend
VOLUME /frontend

# install dependencies
RUN apk add --update openjdk17-jdk bash wget unzip xz

# install angular cli
RUN npm install -g @angular/cli

# install gradle
RUN cd ./tmp && \
    wget https://services.gradle.org/distributions/gradle-8.1.1-bin.zip && \
    unzip gradle-8.1.1-bin.zip && \
    mv gradle-8.1.1 /usr/local/gradle && \
    ln -s /usr/local/gradle/bin/gradle /usr/bin/gradle \

COPY ./build_project.sh /usr/build_project.sh
RUN chmod +x /usr/build_project.sh

CMD tail -f /dev/null
#ENTRYPOINT /usr/build_project.sh