#!/bin/bash
set -x

# replace username for mariadb with the one in the .env file
echo "Replacing username for mariadb"
env | grep -o '\${[^}]*}' /data/Deployment/Production/mariadb-sb/sql-entrypoint/privileges.sql | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" /data/Deployment/Production/mariadb-sb/sql-entrypoint/privileges.sql; done

# replace variables in the backend config file with values from the .env file
echo "Replacing variables in the backend config file"
env | grep -o '\${[^}]*}' /data/StreetbeatzLB_Backend/src/main/resources/application-prod.yml | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" /data/StreetbeatzLB_Backend/src/main/resources/application-prod.yml; done

# replace variables in the frontend config file with values from the .env file
echo "Replacing variables in the frontend config file"
env | grep -o '\${[^}]*}' /data/StreetbeatzLB_Frontend/src/environments/environment.ts | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" /data/StreetbeatzLB_Frontend/src/environments/environment.ts; done

# if reverse proxy is enabled, replace variables in the nginx server config with values from the .env file
if [ "$USE_PROXY" = "true" ]; then
  echo "Replacing variables in the nginx server config"
  env | grep -o '\${[^}]*}' /data/Deployment/ReverseProxy/nginx-rp.conf | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" /data/Deployment/ReverseProxy/nginx-rp.conf; done

  # if PUBLIC_DB_ACCESS is set to true, replace environment variables in nginx stream config
  if [ "$PUBLIC_DB_ACCESS" = "true" ]; then
    stream_config="stream { server { listen 3306; proxy_pass $SERVER_LAN_IP:$DB_PORT; } }"

    #insert multiline stream config string into nginx.conf at line 12
    sed -i "12i $stream_config" /data/Deployment/ReverseProxy/nginx-main.conf
  fi
fi

# rebuild database
if [ "$REBUILD_DB" = "true" ]; then
  echo "Rebuilding database"

  # if files in folder exist, delete them
  if [ -d $DATABASE_STORAGE_PATH ]; then
    echo "Deleting old database files"
    rm -rf $DATABASE_STORAGE_PATH/*
  fi

  if [ "$DB_SAMPLE_DATA" = "true" ]; then
    echo "Inserting sample data"
    cat /data/Deployment/Production/mariadb-sb/database_structure.sql >> /data/Deployment/Production/mariadb-sb/sql-entrypoint/init_streetbeatzdb.sql
    cat /data/Deployment/Production/mariadb-sb/sample_data.sql >> /data/Deployment/Production/mariadb-sb/sql-entrypoint/init_streetbeatzdb.sql
  else
    echo "No sample data"
    cat /data/Deployment/Production/mariadb-sb/database_structure.sql >> /data/Deployment/Production/mariadb-sb/sql-entrypoint/init_streetbeatzdb.sql
  fi
fi

# build backend
echo "Building backend"

chmod +x /data/StreetbeatzLB_Backend/gradlew
/data/StreetbeatzLB_Backend/gradlew -p /data/StreetbeatzLB_Backend clean bootWar
cp /data/StreetbeatzLB_Backend/build/libs/*.war /data/Deployment/Builds/backend/StreetbeatzLB_Backend.war

echo "Backend build finished"

# build frontend
echo "Building frontend"

cd /data/StreetbeatzLB_Frontend
# check if node_modules folder exists
if [ -d /data/StreetbeatzLB_Frontend/node_modules ]; then
  echo "Deleting old node_modules folder"
  rm -rf /data/StreetbeatzLB_Frontend/node_modules
fi
npm install
ng build --base-href $BASE_HREF
cp -R /data/StreetbeatzLB_Frontend/dist/streetbeatzlb /data/Deployment/Builds/frontend

echo "Frontend build finished"

echo "Builds are ready"

exit 0