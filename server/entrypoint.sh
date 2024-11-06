#!/bin/sh
npx sequelize-cli db:create 2>&1 | grep -q 'already exists' || exit 0
npx sequelize-cli db:migrate
exec "$@"
