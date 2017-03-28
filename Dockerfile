FROM node:6.9.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm i
ADD . /usr/src/app/

CMD npm start
