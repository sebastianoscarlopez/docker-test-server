#!/bin/bash

echo "Building docker image"

docker build -t docker-test-server .

echo "To start the container: docker run -p 3000:3000 docker-test-server"

echo "To start the container in debug mode: docker run -p 3000:3000 -v ~/pruebas/docker/server:/app -v /app/node_modules docker-test-server"
