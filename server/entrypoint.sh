#!/bin/sh
# npx sequelize-cli db:create 2>&1 | grep -q 'already exists' || exit 0
# npx sequelize-cli db:migrate
# exec "$@"

#!/bin/sh

# Check if the database already exists
# if npx sequelize-cli db:create 2>&1 | grep -q 'already exists'; then
#   exit 0
# fi

# # If a command is provided, execute it
# if [ $# -gt 0 ]; then
#   exec "$@"
# else
#   echo "No command provided to execute."
#   exit 1
# fi



#!/bin/sh

# # Check if the database already exists
# DB_NAME="${POSTGRES_DB:-Kuripot_dev}"

# echo "Checking if the database '$POSTGRES_DB' exists..."

# # Run Sequelize CLI command to create the database, suppress errors, and check for "already exists" message
# npx sequelize-cli db:create 2>&1 | grep -q "already exists"

# # If grep finds "already exists", skip creation, otherwise proceed
# if [ $? -eq 0 ]; then
#   echo "Database '$POSTGRES_DB' already exists, skipping creation."
# else
#   echo "Creating database '$POSTGRES_DB'..."
#   npx sequelize-cli db:create
# fi
