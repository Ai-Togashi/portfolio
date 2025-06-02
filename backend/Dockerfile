FROM node:20.12.0-alpine3.18

WORKDIR /app

RUN apk update && apk upgrade --no-cache

RUN apk add --no-cache python3 make g++

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]










