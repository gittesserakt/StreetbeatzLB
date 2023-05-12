#!/bin/bash

if [ "$ACTIVE" = "true" ]; then
  # clone project
  #check if folder with name StreetbeatzLB already exists and if true delete it
  if [ -d "/data/StreetbeatzLB" ]; then
    rm -rf /data/StreetbeatzLB
  fi
  cd /data && git clone -b $GIT_REPO_BRANCH $GIT_REPO_URL

  # rebuild database
  if [ "$REBUILD_DB" = "true" ]; then
    echo "Rebuilding database"
    rm -r /data/database/*
  fi

  # change to project root
  cd /data/StreetbeatzLB

  # clean Builds folder
  echo "Cleaning Builds folder"
  # if files in folder exist, delete them
  if [ -d "/data/StreetbeatzLB/Deployment/Builds/backend" ]; then
    rm -r /data/StreetbeatzLB/Deployment/Builds/backend/*
  fi
  if [ -d "/data/StreetbeatzLB/Deployment/Builds/frontend" ]; then
    rm -r /data/StreetbeatzLB/Deployment/Builds/frontend/*
  fi

  # build backend
  echo "Building backend"
  cd ./StreetbeatzLB_Backend

  chmod +x ./gradlew
  ./gradlew clean bootWar
  cp ./build/libs/*.war ../Deployment/Builds/backend/StreetbeatzLB_Backend.war
  cd ..
  echo "Backend build finished"

  # build frontend
  echo "Building frontend"
  cd ./StreetbeatzLB_Frontend
  rm -rf ./node_modules
  npm install
  ng build
  cp -R ./dist/streetbeatzlb ../Deployment/Builds/frontend
  cd ..
  echo "Frontend build finished"

  echo "Builds are ready"
else
  echo "Builds were skipped"
fi

exit 0