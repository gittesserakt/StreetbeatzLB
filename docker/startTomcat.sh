#!/bin/bash

# tomcat webapps bug workaround
mv webapps webapps2
mv webapps.dist webapps

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war ./webapps/streetbeatzlb.war
keytool -importkeystore -srckeystore /data/keystore.p12 -srcstoretype PKCS12 -destkeystore tomcatssl.jks -deststoretype JKS -deststorepass streetbeatzlb -srcstorepass streetbeatzlb -noprompt
/usr/local/tomcat/bin/catalina.sh run