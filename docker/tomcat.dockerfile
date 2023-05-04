FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

COPY server.xml /usr/local/tomcat/conf/server.xml
COPY startTomcat.sh startTomcat.sh
RUN chmod +x startTomcat.sh

#CMD tail -f /dev/null
ENTRYPOINT ["./startTomcat.sh"]