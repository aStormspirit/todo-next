FROM node:17-buster

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npx prisma db push

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]