#!/bin/bash

echo "Starting containers..."
docker compose up -d

echo "Installing dependencies..."
npm install

echo "Running migrations..."
npx knex migrate:latest

echo "Seeding database..."
npx knex seed:run

echo "Starting server..."
npm run dev
