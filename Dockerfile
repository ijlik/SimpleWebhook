FROM node:12.0-alpine

RUN npm install

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

EXPOSE 7777

CMD node index.js
