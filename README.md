
# Gazin Test

Gazin test is a project to show my skills in frontend and backend made with NestJS,  VueJS and PostgreSQL

## Installation

### Options:
#### Use the package manager [yarn](https://yarnpkg.com/) to run the backend and frontend

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
```

Copy env.example and rename to .env
Setup the API URL

#### Use the docker-compose.yml to run the backend, frontend and the database

```bash
Go to the main project folder and run the command:

$ docker compose up
```

Once you run the docker compose you are ready to go
Go `localhost:8080`



## Endpoints

You can see all endpoints with the Swagger, just run the backend and access `/api`   
E.g `localhost:3000/api`


## License

[MIT](https://choosealicense.com/licenses/mit/)
