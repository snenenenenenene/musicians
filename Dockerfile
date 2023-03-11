FROM node:14

LABEL version="1.0"
LABEL description="Docker image for the Musicians internship project (backend)"
LABEL maintainer = ["belssen@cronos.be"]

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

CMD ["npm", "start"]