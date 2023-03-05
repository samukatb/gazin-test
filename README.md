
# Gazin Test

Gazin test is a project to show my skills in frontend and backend made with NestJS,  VueJS and PostgreSQL

## Installation

### Requirements
[Docker](https://www.docker.com/) - Optional - To run everything effortlessly
[yarn](https://yarnpkg.com/) 
[PostgreSQL](https://www.postgresql.org/) - Optional - Only if you run without docker

### First steps
```
$ git clone https://github.com/samukatb/gazin-test

Choose an option to run the project
```

### Options:
#### 1 - Use the package manager [yarn](https://yarnpkg.com/) to run the backend and frontend

Backend
```bash
$ yarn install
$ yarn start:dev
```
Copy env.example and rename to .env
Setup the PostgreSQL database and update the URL in the env

Frontend
```bash
$ yarn install
$ yarn dev

Go localhost:8080
```

#### 2 - Use the docker-compose.yml to run the backend, frontend and the database

```bash
Go to the main project folder and run the command:

$ docker compose up
```

Once you run the docker compose you are ready to go
Go `localhost:8080`

## Tests

To run the backend tests, go to the backend folder and run the following commands
```
$ yarn test
```

## Endpoints

You can see all endpoints with the Swagger, just run the backend and access `/api`   
E.g `localhost:3000/api`


## License

[MIT](https://choosealicense.com/licenses/mit/)
