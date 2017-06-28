FROM node:6.10.3-alpine

RUN mkdir -p /usr/src/companies
WORKDIR /usr/src/companies/dist

VOLUME /usr/src/companies/dist

ADD package.json /usr/src/companies
ADD npm-shrinkwrap.json /usr/src/companies
RUN npm i
ADD . /usr/src/companies/

CMD npm start