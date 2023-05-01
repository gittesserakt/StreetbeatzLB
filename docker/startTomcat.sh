#!/bin/bash

# tomcat webapps bug workaround
mv /opt/tomcat/webapps /opt/tomcat/webapps2
mv /opt/tomcat/webapps.dist /opt/tomcat/webapps

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war /opt/tomcat/webapps/
/opt/tomcat/bin/catalina.sh run