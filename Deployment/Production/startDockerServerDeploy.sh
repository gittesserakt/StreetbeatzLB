#!/bin/bash
# only start if on server and files unpacked
docker-compose --env-file ../Environment/production.env up -d