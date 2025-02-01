
FROM node:18


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .

RUN ls -l /app


EXPOSE 3000


CMD ["node", "server.js"]
