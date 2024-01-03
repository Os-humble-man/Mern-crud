
FROM node:latest

RUN node -v
RUN npm -v

RUN npm config set registry "https://registry.npmjs.org/"


WORKDIR /server/


COPY package*.json ./


RUN  npm install


COPY . server/


EXPOSE 3000


CMD ["node", "index.js"]
