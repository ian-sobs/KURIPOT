![banner](https://github.com/user-attachments/assets/14ea9068-2653-4cb2-8cc6-907c6dc2291a)

# Kuripot

Kuripot is a simple finance tracker created in compliance for our AppDevelopment(3105) class.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
<!-- 
- [Usage](#usage)

<!-- 
  - [Setting up the database](#setting-up-the-database)
    - [Creating the database](#creating-the-database)
    - [Migrating the database](#migrating-the-database)
    - [Undoing database migrations](#undoing-database-migrations)
    - [Connecting DBeaver to the database in Docker container](#connecting-dbeaver-to-the-database-in-docker-container)

- [Contributing](#contributing)
- [License](#license)
``` -->
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
- [PostgreSQL](https://www.postgresql.org/download/)
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

Install dependencies in client:

```bash
cd client
```

```bash
npm install
```

Install dependencies in server:

```bash
cd server
```

```bash
npm install
```

## Running the Project

### Server

#### Server environment variable configurations

The configurations will focus on the development environment only.

Remove the `.example` extension from the `.env` files and set the appropriate values for the environment variables.

##### `/server/.env`

Set `NODE_ENV` to `development`.
```
NODE_ENV=development    # the environment the server should run in. 
```

##### `/server/.env.development`

After loading `/server/.env`, the value of `NODE_ENV` is used to load another `env` file for `/server` at runtime. Since `NODE_ENV` in `/server/.env` is `development`, `/server/.env.development` gets loaded.

NOTE: The postres user must have a non-empty password.

```
NODE_ENV       # environment the server should run in.
			   # defaults to 'development'

POSTGRES_HOST     # the IP address of the database server.
				  # defaults to 'localhost'.

POSTGRES_USER     # the username you set for the postgresql database.
			      # defaults to 'postgres'.

POSTGRES_PASSWORD  # the password of the postgresql user POSTGRES_USER.

POSTGRES_DB         # the name of the postgresql database containing
					# the user's data for Kuripot.
					# defaults to 'Kuripot_dev'. 
					# if database doesn't exist, it will be created by 
					# running 'npm run dev' in the /server directory.

POSTGRES_PORT       # port number the database server should listen for 
					# sequelize queries.

SALT_ROUNDS         # salt rounds/cost factor for Bcrypt hashing process.
					# defaults to 10 for the hashing of passwords in
					# sign up.
					
PORT          # the port number the web server should listen to for
			  # for requests made by the client.
        # web server defaults to port 5000 if not specified.

ACCESS_TOKEN_JWT_SECRET    # the secret key used to sign access tokens.

REFRESH_TOKEN_JWT_SECRET   # the secret key for signing refresh tokens.

CORS_ORIGIN         # frontend origin allowed to access the server
                    # if not specified, server defaults to 
                    # http://localhost:3000 
```

#### Running the server

Run the below command in `/server` directory:
```bash
npm run dev
```

### Client

#### Client environment variable configurations

The configurations will focus on the development environment only.

Remove the `.example` extension from the `.env` files and set the appropriate values for the environment variables.

##### `/client/.env`

Set `WATCHPACK_POLLING` to `true`.
```
WATCHPACK_POLLING=true
```

##### `/client/.env.development`

Replace `{server_listening_on_port}` with the value of `PORT` in `/server/env.development`. If `PORT` is not specified, replace `{server_listening_on_port}` with `5000`.
```
REACT_APP_API_URL=http://localhost:{server_listening_on_port}/api
```

#### Running the client

Run the below command in `/client` directory:
```bash
npm start
```

