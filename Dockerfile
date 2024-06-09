FROM node:14

WORKDIR /app


# ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./wait-for-it.sh
# RUN chmod +x ./wait-for-it.sh

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

# Add the wait-for-it script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

# RUN npm run migrate

# RUN npm run seed

EXPOSE 3000

# CMD [ "npm", "run", "start:migrate" ]
# CMD ./wait-for-it.sh db:5432 -- npm run migrate &&  npm start
# CMD ./wait-for-it.sh -t 10 db:5432 --  npm run start:migrate
CMD /wait && npm run start
# CMD ./wait-for-it.sh db:5432 -- npx prisma migrate deploy && ts-node prisma/seeds/seeds.ts && npm start
# CMD ./wait-for-it.sh db:5432 -- npx prisma migrate deploy && npx prisma db seed --preview-feature && npm start
# CMD [ "npm", "start:migrate" ]