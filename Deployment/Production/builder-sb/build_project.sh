#!/bin/bash
set -x
set -e

# replace username for mariadb with the one in the .env file
echo "Replacing username for mariadb"
env | grep -o '\${[^}]*}' $project_path/Deployment/Production/mariadb-sb/sql-entrypoint/privileges.sql | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" $project_path/Deployment/Production/mariadb-sb/sql-entrypoint/privileges.sql; done

# replace variables in the backend config file with values from the .env file
echo "Replacing variables in the backend config file"
env | grep -o '\${[^}]*}' $project_path/StreetbeatzLB_Backend/src/main/resources/application-prod.yml | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" $project_path/StreetbeatzLB_Backend/src/main/resources/application-prod.yml; done

# replace variables in the frontend config file with values from the .env file
echo "Replacing variables in the frontend config file"
env | grep -o '\${[^}]*}' $project_path/StreetbeatzLB_Frontend/src/environments/environment.ts | sed -e 's/\${\([^}]*\)}/\1/g' | while read -r var; do sed -i "s|\${$var}|${!var}|g" $project_path/StreetbeatzLB_Frontend/src/environments/environment.ts; done

# rebuild database
if [ "$REBUILD_DB" = "true" ]; then
  echo "Rebuilding database"

  # if files in folder exist, delete them
  if [ -d $DATABASE_STORAGE_PATH ]; then
    echo "Deleting old database files"
    rm -r $DATABASE_STORAGE_PATH/*
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