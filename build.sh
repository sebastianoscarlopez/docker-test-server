#!/bin/bash

echo "Creating docker-test network"
docker network create docker-test

echo "Instalando mongo"
docker pull mongo

echo "Running mongo container"
docker run -d --name mongodb --network docker-test mongo

echo "Building server image"
docker build -t docker-test-server .

echo "Running server container ready for debugging"
docker run -d --name docker-test-server -p 3000:3000 -v ~/pruebas/docker/server:/app -v /app/node_modules --network docker-test docker-test-server
