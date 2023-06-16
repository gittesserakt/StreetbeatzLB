FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

# tomcat webapps bug workaround
RUN mv webapps webapps2 && \
    mv webapps.dist webapps

COPY tomcat-sb/startTomcat.sh /usr/local/tomcat/startTomcat.sh
RUN chmod +x /usr/local/tomcat/startTomcat.sh

ENTRYPOINT /usr/local/tomcat/startTomcat.sh