FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

# tomcat webapps bug workaround
RUN mv webapps webapps2 && \
    mv webapps.dist webapps

COPY tomcat-sb/server.xml /usr/local/tomcat/conf/server.xml
RUN chmod +x tomcat-sb/startTomcat.sh
COPY tomcat-sb/startTomcat.sh startTomcat.sh

ENTRYPOINT ["./startTomcat.sh"]