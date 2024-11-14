# Kuripot

Kuripot is a simple finance tracker created in compliance for our AppDevelopment(3105) class.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
  - [Setting up the database](#setting-up-the-database)
    - [Creating the database](#creating-the-database)
    - [Migrating the database](#migrating-the-database)
    - [Undoing database migrations](#undoing-database-migrations)
    - [Connecting DBeaver to the database in Docker container](#connecting-dbeaver-to-the-database-in-docker-container)

- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Express, Sequelize, Node version 22.11.0
- **Database:** PostgreSQL
<!-- - **Containerization:** Docker -->

## Project Structure

```
KURIPOT/
│
├── client/           # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── server/           # Express backend
    ├── server.js
    ├── package.json
    └── ...

README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.11.0 or higher)
- [Nodemon](https://www.npmjs.com/package/nodemon)
<!-- - [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/) -->

### Installation

Clone the repository:

```bash
git clone https://github.com/ian-sobs/KURIPOT.git
```

```bash
cd KURIPOT
```

### Running the Project

<!-- To run both the frontend and backend, use Docker Compose:

1. Make sure you’re in the root of your project directory.
2. Run the following command:

   ```bash
   docker-compose up
   ```

Your Express server should be accessible at `http://localhost:5001`, and your React app at `http://localhost:3000`. -->

## Usage

Provide instructions on how to use your project. Include examples if necessary.

## Setting up the database

<!-- 
> **Note:** Install Docker Desktop before proceeding.  
> It is recommended to install Docker Desktop first since it includes many of the utilities used in the project and simplifies the commands you need to run for setting up the database.
 -->

<!-- 
If you have pulled the repo and built the Docker images and run the containers for the first time, the database associated to this web app will not exist just yet. Hence why running the server container for the first time requires you to build the database in the server container. Instructions to that are in the [[#Creating the database]] section below. -->

Create the postgresql database first. Use the same database name as the one in the environment variable database name.

### Creating the database

In server directory run the below command:

```
npx sequelize-cli db:create
```

<!-- The database will be created by using the configuration of the databases in the docker-compose.yml file. The database config used is determined by the value of the `depends_on` attribute of `server` service.  By default, the `NODE_ENV` environment variable of `server` service is development. The value of the `depends_on` attribute of `server` service is also the development database by default. (Note: Only development and test environments can sync the models to the database, it is recommended to use development/test for coding and testing purposes). -->


### Migrating the database

Follow the instructions here if the database exists and already has records. Any change you make to the database will not destroy the database and recreate it with the changes you made (like in syncing the models). This is good for production environments wherein you want scale the database without destroying any records.

1. Install sequelize CLI (if not yet installed)
2. Run the server
<!-- 3. Access the container of the server and just run the command in exec to do the migrations: -->

```
npx sequelize-cli db:migrate 
```

Alternatively you can also specify the environment:
```
npx sequelize-cli db:migrate --env <environment_name>
```

### Undoing database migrations

1. Install sequelize CLI (if not yet installed)
2. Run the server
<!-- 3. Access the container of the server and just run the command in 'Exec' to undo the last migration: -->
```
npx sequelize-cli db:migrate:undo
```

To undo all migrations:
```
npx sequelize-cli db:migrate:undo:all
```

<!-- 
### Connecting dbeaver to the database in docker container

1. In dbeaver, create a new connection to a database.
2. When asked for the user, just use the value of `POSTGRES_USER` server environment variable for connecting to the database.
3. When asked for the password, just use the value of `POSTGRES_PASSWORD` server environment variable.
4. When asked for the host, just use 'localhost' without the quotes.
5. When asked for the port, use the value of `POSTGRES_PORT`. -->
<!-- 
```
# version: "3"

services:
  server:
    build:
      context: ./server
    ports:
      - "5001:5000"
    environment:
      - PORT=5000
      - NODE_ENV=development
      - POSTGRES_HOST=dbDev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=somePassword
      - POSTGRES_DB=Kuripot_dev
      - POSTGRES_PORT=5432
    depends_on:
      dbDev:
        condition: service_healthy

  dbDev:
    image: postgres
    restart: always
    user: postgres
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=Kuripot_dev
      - POSTGRES_PASSWORD=somePassword
    expose:
      - 5432
    ports:
      - "5433:5432" # port 5432(docker) is mapped to port 5433(localhost)
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
``` -->

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
