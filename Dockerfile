FROM node:16-alpine

RUN apk update && \
    apk upgrade && \
    apk add make && \
    apk add --no-cache python3 g++ make && \
    rm -rf /var/cache/apk/*

WORKDIR /app

ENV LANG=C.UTF-8 TZ=Asia/Tokyo
ARG API_HOST
ENV API_HOST ${API_HOST}

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 5173
