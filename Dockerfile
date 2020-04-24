FROM node:12.0-alpine

COPY package.* ./

RUN npm install

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY . .

ENV HANDLER_PATH /webhook

ENV HANDLER_SECRET secret

ENV GIT_REPOSITORY_PATH /repository

ENV GIT_REPOSITORY_REF refs/heads/master

ENV GIT_REPOSITORY_REMOTE origin

ENV GIT_REPOSITORY_BRANCH master

EXPOSE 7777

CMD node index.js
