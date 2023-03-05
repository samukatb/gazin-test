FROM node:14

WORKDIR ./app

RUN npm install -g http-server

COPY ./frontend/tsconfig*.json ./
COPY ./frontend/package.json ./
COPY ./frontend/.env.example ./.env

RUN yarn install

COPY ./frontend .

CMD ["yarn", "dev", "--host", "0.0.0.0"]
EXPOSE 8080