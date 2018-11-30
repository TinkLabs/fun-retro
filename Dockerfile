FROM node:9

COPY ./ /app
WORKDIR /app
RUN npm install gulp -g
RUN npm install

EXPOSE 4000