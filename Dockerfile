FROM node:alpine3.12

WORKDIR /app

COPY package.json .

RUN npm i -g nodemon

RUN  npm i 

COPY . .

CMD ["npm", "run", "start"]

EXPOSE 3000