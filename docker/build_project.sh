#!/bin/bash

# build backend
cd ./backend
gradle clean bootWar
rm -rf ../builds/backend
mkdir ../builds/backend
cp ./build/libs/*.war ../builds/backend/StreetbeatzLB_Backend.war
cd ..

# build frontend
cd ./frontend 
rm -rf ./node_modules
npm install
/usr/local/nodejs/bin/ng build
rm -rf ../builds/frontend
mkdir ../builds/frontend
cp -R ./dist/streetbeatzlb ../builds/frontend

echo "Builds are ready"
exit 0