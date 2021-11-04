FROM node:14
 ENV NODE_ENV=production

 # Create app directory
 WORKDIR /app

 # Install app dependencies
 # A wildcard is used to ensure both package.json AND package-lock.json are copied where available
 COPY package*.json ./

 RUN npm install
 # If you are building your code for production
 # RUN npm ci --only=production

 # Bundle app source
 COPY . .

 EXPOSE 9600
 CMD [ "npm", "start" ] 