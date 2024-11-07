#!/bin/sh
# npx sequelize-cli db:create 2>&1 | grep -q 'already exists' || exit 0
# npx sequelize-cli db:migrate
# exec "$@"

#!/bin/sh

# Check if the database already exists
if npx sequelize-cli db:create 2>&1 | grep -q 'already exists'; then
  exit 0
fi

# If a command is provided, execute it
if [ $# -gt 0 ]; then
  exec "$@"
else
  echo "No command provided to execute."
  exit 1
fi
