FROM node:9

COPY ./ /app
WORKDIR /app
RUN npm install gulp -g

EXPOSE 5000