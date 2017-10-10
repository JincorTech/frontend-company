FROM node:8.0.0-alpine

WORKDIR /usr/src/companies
ADD . /usr/src/companies/
RUN npm i
RUN npm run build 
VOLUME /usr/src/companies
CMD npm start
