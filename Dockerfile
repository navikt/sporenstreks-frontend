FROM navikt/node-express:14-alpine

WORKDIR /var

COPY build/ build/
COPY server/ server/

WORKDIR /var/server

RUN npm install -g http-proxy-middleware

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
