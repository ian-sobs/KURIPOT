# Kuripot

Kuripot is a simple finance tracker.

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
- **Database:** TBD
- **Containerization:** Docker

## Project Structure

```
your-project/
│
├── Client/           # React frontend
│   ├── Dockerfile
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
└── Server/           # Express backend
    ├── Dockerfile
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

1. Clone the repository:

   ```bash
   git clone https://github.com/ChanAbay-abay/Kuripot.git
   cd Kuripot
   ```

2. Navigate to the Server folder and install dependencies:

   ```bash
   cd server
   npm install
   ```

3. Navigate to the Client folder and create the React app:

   ```bash
   cd ../client
   npx create-react-app .
   ```

4. Install Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. Configure Tailwind CSS (update `tailwind.config.js` and `src/index.css` as mentioned above).

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
