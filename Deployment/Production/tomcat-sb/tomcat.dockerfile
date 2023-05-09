FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

# tomcat webapps bug workaround
RUN mv webapps webapps2 && \
    mv webapps.dist webapps

COPY server.xml /usr/local/tomcat/conf/server.xml
COPY startTomcat.sh startTomcat.sh
RUN chmod +x startTomcat.sh

ENTRYPOINT ["./startTomcat.sh"]