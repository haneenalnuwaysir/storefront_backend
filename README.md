# storefront_backend

## Set-Up

Need you to set up first:

To install all dependencies:
`npm install`

To start the docker container:
`docker-compose up`

## Environmental Variables

To satisfy Udacity requirements, the following environment variable are needed.

You must create file .env and then put the environment variable below
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_USER=haneen_postgres
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=yourSecretToken
SALT_ROUNDS=10
TOKEN_SECRET=yourSecretToken

```

## Dev-Mode

To run the app in dev mode, run :

`npm run start`

The app will run on port ```8000``` with database on ```5432```.

If an error "database store already exists", run :

`npm run drop-dev-db`


## Ports

The app runs on port ```8000``` with database on ```5432```.

## Test Mode

To run the app in test mode, run :

`npm run test`

The application will run on port ```8001``` with database on ```5432```.

If an error "database store_test already exists", run :

`npm run drop-test-db`

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Endpoint Access & Database & Postman


*The database schema , API route and Postman informations can be found in the [REQUIREMENT.md](REQUIREMENTS.md) file.*

## Author

- [@haneenalnuwaysir](https://github.com/haneenalnuwaysir)
