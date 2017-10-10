FROM node:8.0.0-alpine

VOLUME /usr/src/companies
WORKDIR /usr/src/companies
ADD package.json /usr/src/companies/

RUN npm i

CMD npm start
