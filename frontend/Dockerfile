# base image
FROM node:20-alpine

# set directory
WORKDIR /opt/app

# add application and install dependencies
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# setup the build
RUN npm run build
