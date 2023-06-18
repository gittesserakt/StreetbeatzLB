#!/bin/bash

env | grep -o '\${[^}]*}' /etc/nginx/conf.d/default.conf | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" /etc/nginx/conf.d/default.conf; done