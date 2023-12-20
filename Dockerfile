ARG version="3.16"
FROM node:18-alpine${version}

LABEL version="version api 1.0"
LABEL description="This API is used to retrieve and store questions in a MysqlDB."

WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
