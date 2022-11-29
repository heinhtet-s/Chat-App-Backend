FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
EXPOSE 5000
CMD [ "npm", "start" ]

