FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash

#RUN echo yes | keytool -importcert -alias hjetter -keystore \
#    /$JAVA_HOME/lib/security/cacerts -storepass streetbeatzlb -file /data/hjetter.der

COPY startTomcat.sh startTomcat.sh
RUN chmod +x startTomcat.sh

#CMD tail -f /dev/null
ENTRYPOINT ["./startTomcat.sh"]