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
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Express, Sequelize
- **Database:** SQL
- **Containerization:** Docker

## Project Structure

```
Kuripot/
│
├── client/           # React frontend
│   ├── dockerfile
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── server/           # Express backend
    ├── dockerfile
    ├── server.js
    ├── package.json
    └── ...

docker-compose.yml
README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

Clone the repository:

```bash
git clone https://github.com/ChanAbay-abay/Kuripot.git
```

```bash
cd Kuripot
```

### Running the Project

To run both the frontend and backend, use Docker Compose:

1. Make sure you’re in the root of your project directory.
2. Run the following command:

   ```bash
   docker-compose up
   ```

Your Express server should be accessible at `http://localhost:5001`, and your React app at `http://localhost:3000`.

## Usage

Provide instructions on how to use your project. Include examples if necessary.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
