FROM node:6.9.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app/
RUN npm i

CMD npm start
