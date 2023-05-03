#!/bin/bash

# tomcat webapps bug workaround
mv webapps webapps2
mv webapps.dist webapps

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war ./webapps/streetbeatzlb.war
keytool -import -alias hjetter -file /data/hjetter.p12 -keystore /usr/local/tomcat/conf/keystore.p12 -storepass streetbeatzlb -noprompt
/usr/local/tomcat/bin/catalina.sh run