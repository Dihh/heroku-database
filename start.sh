#!/bin/bash

mkdir ~/.ssh
cp /root/.ssh/id_rsa ~/.ssh/id_rsa
cp /root/.ssh/known_hosts ~/.ssh/known_hosts

chmod 600 /root/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

git pull

npm start &
while true
do
    git add temp.db
    if git commit -m "db"; then
        git push origin HEAD
    fi
    sleep 900
done