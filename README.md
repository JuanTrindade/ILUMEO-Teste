# ILUMEO - Ponto
Project to ILLUMEO test for "ponto" application

## Getting Started

First, copy or clone the repository on your local machine, after that will described how to install it and run.

### Prerequisites

For this project will need 
- [PostgreSQL](https://www.postgresql.org/download/)
- [ReactJS](https://react.dev/learn/installation)
- [NodeJS](https://nodejs.org/pt/download/package-manager)
- [Express](https://expressjs.com/pt-br/)
- [KnexJS](https://knexjs.org/guide/)

### Installing

To install the required packages for front and backend you will need to do:

#### frontend
``cd .\frontend\``
```
npx install
```
this will install all the packages of frontend

#### backend

``cd .\backend\``
```
npx install
```
this will install all the packages of backend

## Create PostgreSQL database

Before running migrations and start the server you will need to create a postgreSQL Database, do that it´s simples, on `PSQL` just do

```
CREATE DATABASE database_name;
```
And that´s it, your database is created!

don´t forget your `.env` file, the variables must be on that pattern

```env
PG_USER="user"
PG_PASSWORD="password"
PG_HOST="localhost"
PG_DATABASE="database"
PG_PORT=5432
```

### Running Migrations

To running migrations and create the tables just need to run on backend root folder

```
npx knex migrate:latest .\knexfile.js
```
This will run the migrations!

## Running Servers
If all that steps will did correctly, you will be able to run the project frontend and backend servers, to run just use the command:

```
npm start
```
in the root of backend and frontend folders

### Creating User
Finally you will need to create a user to log-in on platform, when back end server is running just send a post request to: ``"localhost/usercreate"``.
The body must be a json like that:

```json
"user_code": "the_code"
"name": "name"
```

## Author

* **Juan Trindade** 💻
