FROM node:latest
WORKDIR /app
COPY . .
COPY ./ssh /root/.ssh
RUN git config --local user.email "diegton@gmail.com"
RUN git config --local user.name "Diegton Rodrigues"

CMD ["bash","start.sh"]
EXPOSE 3000