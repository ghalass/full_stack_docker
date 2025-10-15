#!/bin/sh
# wait-for-db.sh
echo "⏳ Waiting for database..."
until npx prisma db push; do
  sleep 2
done
echo "✅ Database is ready!"
