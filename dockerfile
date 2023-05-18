FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    netcat \
 && rm -rf /var/lib/apt/lists/* \
 && npm install

COPY . .

EXPOSE 3003

CMD ["npm", "start"]




