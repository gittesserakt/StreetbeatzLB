FROM tomcat:9-jdk17

# install all dependencies
RUN apt-get update && \
    apt-get install -y bash

EXPOSE 8080

COPY startTomcat.sh usr/local/startTomcat.sh
RUN chmod +x usr/local/startTomcat.sh

CMD tail -f /dev/null
#CMD usr/local/startTomcat.sh
