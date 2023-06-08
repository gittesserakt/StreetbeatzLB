#!/bin/bash
set -x
set -e

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
/data/StreetbeatzLB_Backend/gradlew clean bootWar /data/StreetbeatzLB_Backend
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