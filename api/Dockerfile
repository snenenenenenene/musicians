FROM node:14

LABEL version="1.0"
LABEL description="Docker image for the Musicians internship project (backend)"
LABEL maintainer = ["belssen@cronos.be"]

WORKDIR /backend
RUN npm install -g @nestjs/cli
COPY package.json .
RUN npm install @nestjs/sequelize
RUN npm install @nestjs/common
RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]