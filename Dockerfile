FROM node:8.0.0-alpine

VOLUME /usr/src/companies
WORKDIR /usr/src/companies

RUN npm i

CMD /bin/true
