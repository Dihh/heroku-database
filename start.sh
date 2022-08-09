#!/bin/bash
chmod 600 /root/.ssh/id_rsa
echo "---"
ls -l /root/.ssh
echo "---"
git pull
npm start &
while true
do
    git add temp.db
    if git commit -m "db"; then
        git push origin HEAD
    fi
    sleep 60
done