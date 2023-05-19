#!/bin/bash

mkdir certs
cp ../Environment/hjetter.key certs/hjetter.key
cp ../Environment/hjetter_ddns_net.pem certs/hjetter_ddns_net.pem

# list of files to compress
files=(
  "docker-compose.yml"
  "nginx-rp.conf"
  "nginx-rp.dockerfile"
  "upReverseProxy.sh"
  "downReverseProxy.sh"
  "certs"
  "index.html"
  "startNginx.sh"
)

mkdir reverse_proxy
# move files to folder
for file in ${files[@]}; do
  cp -r $file reverse_proxy/$file
done

# name of the archive
archive_name="reverse_proxy.tar.gz"

# compress files
tar -czvf $archive_name reverse_proxy

# remove folder
rm -rf reverse_proxy
rm -rf certs