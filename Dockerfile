FROM node:8.0.0-alpine

WORKDIR /usr/src/companies
ADD . /usr/src/companies/

RUN npm i

CMD npm run build
