# Compile stage
# docker build -t iris/apps/swiftfront:CI -f Dockerfile .
FROM node:18.15-alpine AS build

ARG EXTRA_CONFIG=
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN node_modules/.bin/ng build $EXTRA_CONFIG

# Generate container stage
FROM nginx:alpine

WORKDIR /swiftfront

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


