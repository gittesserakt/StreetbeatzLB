#!/bin/bash

# list of folders to compress
folders=("Builds" "Environment" "Production")

# name of the archive
archive_name="streetbeatzlb_server.tar.gz"

# compress folders
tar -czvf $archive_name ${folders[@]}