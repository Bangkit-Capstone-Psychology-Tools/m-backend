FROM node:14

WORKDIR /app


COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

# Add the wait-for-it script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

CMD /wait && npm run start