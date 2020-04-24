FROM node:12.0-alpine

COPY package.* ./

RUN npm install

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY . .

EXPOSE 7777

CMD node index.js
