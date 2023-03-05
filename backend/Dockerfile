FROM node:14

WORKDIR ./app

COPY ./backend/tsconfig*.json ./
COPY ./backend/package.json ./
COPY ./backend/.env.example ./.env

RUN yarn install

COPY ./backend .

CMD ["yarn", "start:dev"]