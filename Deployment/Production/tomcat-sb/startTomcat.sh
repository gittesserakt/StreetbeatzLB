#!/bin/bash

cd / && keytool -importkeystore -srckeystore /data/Environment/hjetter.p12 -srcstoretype PKCS12 -destkeystore /usr/local/tomcat/tomcatssl.jks -deststoretype JKS -deststorepass streetbeatzlb -srcstorepass streetbeatzlb -noprompt

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war ./webapps/streetbeatzlb.war
/usr/local/tomcat/bin/catalina.sh run