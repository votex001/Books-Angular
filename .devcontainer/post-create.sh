#!/bin/sh
# Mark the working directory as safe for use with git
git config --global --add safe.directory $PWD


if [ -d node_modules ]; then
  sudo chown $(id -u):$(id -g) node_modules
fi

if [ -d client/node_modules ]; then
  sudo chown $(id -u):$(id -g) client/node_modules
fi

# Install packages for the server
if [ -f package.json ]; then
    npm ci
fi

# Install packages and build the client
if [ -f client/package.json ]; then
    (cd client; npm ci; npm run build)
fi