FROM node:lts-alpine
RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev
RUN cd client && npm install vite --save-dev && cd ..

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN  npm run build

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000