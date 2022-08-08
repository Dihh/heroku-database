#!/bin/bash

while true
do
    git add temp.db
    if git commit -m "db"; then
        git push origin HEAD
    fi
    sleep 60
done