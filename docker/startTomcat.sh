#!/bin/bash

# tomcat webapps bug workaround
mv webapps webapps2
mv webapps.dist webapps

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war ./webapps/streetbeatzlb.war
/usr/local/tomcat/bin/catalina.sh run