set -e

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for $DB_HOST:$DB_PORT…"
  sleep 2
done


npx sequelize-cli db:migrate


exec npm run start