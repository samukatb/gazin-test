FROM node:14

WORKDIR ./app

COPY ./backend/tsconfig*.json ./
COPY ./backend/package.json ./

RUN yarn install

COPY ./backend .

CMD ["yarn", "dev"]