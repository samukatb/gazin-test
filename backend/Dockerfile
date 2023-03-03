FROM node:14

WORKDIR ./app

COPY ./backend/tsconfig*.json ./
COPY ./backend/package.json ./

# RUN npm install -g yarn
RUN yarn install

COPY ./backend .

CMD ["yarn", "start:dev"]
# CMD ["npm", "run", "start:dev"]