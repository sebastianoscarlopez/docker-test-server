FROM node:erbium

WORKDIR /app

COPY package.json .

RUN npm i

COPY ./src .

EXPOSE 3000

CMD [ "npm", "start" ]
