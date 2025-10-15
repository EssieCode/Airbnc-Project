# AirBNC

This is the source code for RESTful backend server which serves up properties related data.

The server is built in `express` and connects with postgreSQL database.

You will need a postgreSQL server running in your machine.

You will user MVC structure to develop the web server.

## Project setup

- Run `npm install` in the root of repo to install the dependencies required.

- Run `npm run create_db` to create the database.

- Connect to the db  using `node-postgres`

- Create a `.env.test` file at the root level with the following content:
```
PGDATABASE=airbnc_test_01_test
```

- Create a `.env.dev` file at the root level with the following content:
```
PGDATABASE=airbnc_test_01_dev
```

For `.env.prod`  - reach out-


## Seeding 
To seed each database use the following scripts:

test - `npm run seed-test`

dev - `npm run seed-dev`

prod - `npm run seed-prod`

## Tests

integratiion testing is used for the endpoints. 

Run command: `npm test` to run all tests.



