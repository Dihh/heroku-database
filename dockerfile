FROM node:latest
WORKDIR /app
COPY . .
CMD ["npm", "start"]
EXPOSE 3000

# wget –c https://www.sqlite.org/2021/sqlite-autoconf-3390200.tar.gz
# tar xvfz ../sqlite-autoconf-3390200.tar.gz
# cd sqlite-autoconf-3390200/
# ./configure
# make
# make install
# sqlite3 --version
