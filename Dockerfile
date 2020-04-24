FROM node:12.0.0

RUN npm install

RUN apt-get install git

EXPOSE 7777

