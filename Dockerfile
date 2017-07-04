FROM node:6.10.3-alpine

VOLUME /usr/src/companies
WORKDIR /usr/src/companies

RUN npm i

CMD /bin/true
