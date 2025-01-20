FROM node:18

VOLUME /application

COPY . /application

WORKDIR /application

RUN yarn

RUN yarn build