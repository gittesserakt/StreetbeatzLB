#!/bin/bash
# only start if on server and files unpacked
docker-compose --env-file ../Environment/.env.prod up -d