FROM node:latest
WORKDIR /app
COPY . .
COPY ./ssh /root/.ssh
RUN chmod 600 /root/.ssh/id_rsa
RUN git config --local user.email "diegton@gmail.com"
RUN git config --local user.name "Diegton Rodrigues"
RUN git pull
CMD ["bash","start.sh"]
EXPOSE 3000

# wget –c https://www.sqlite.org/2021/sqlite-autoconf-3390200.tar.gz
# tar xvfz ../sqlite-autoconf-3390200.tar.gz
# cd sqlite-autoconf-3390200/
# ./configure
# make
# make install
# sqlite3 --version
