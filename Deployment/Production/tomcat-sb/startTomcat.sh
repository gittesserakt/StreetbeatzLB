#!/bin/bash

# start tomcat
cp /var/www/streetbeatzlb/StreetbeatzLB_Backend.war /usr/local/tomcat/webapps/streetbeatzlb.war
/usr/local/tomcat/bin/catalina.sh run