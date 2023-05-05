FROM tomcat:10-jdk17

VOLUME /data

RUN apt-get update && \
    apt-get install -y bash && \
    apt-get install -y curl

# tomcat webapps bug workaround
RUN mv webapps webapps2 && \
    mv webapps.dist webapps

#install certificate for ssl
COPY /data/hjetter.p12 /data/hjetter.p12
RUN cd / && keytool -importkeystore -srckeystore /data/hjetter.p12 -srcstoretype PKCS12 -destkeystore /usr/local/tomcat/tomcatssl.jks -deststoretype JKS -deststorepass streetbeatzlb -srcstorepass streetbeatzlb -noprompt

COPY server.xml /usr/local/tomcat/conf/server.xml
COPY startTomcat.sh startTomcat.sh
RUN chmod +x startTomcat.sh

ENTRYPOINT ["./startTomcat.sh"]