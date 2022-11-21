# using Node:16 Image since it contains all
# the necessary build tools required for dependencies with native
# First Stage: to install and build dependencies
FROM node:16.3.0  AS development
WORKDIR /app/scrapper
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Second Stage: Setup command to run our app using lightweight !
FROM node:16.3.0-alpine 
WORKDIR /app
EXPOSE 4000
COPY --from=development /app/scrapper ./
CMD [ "npm", "run", "start:prod" ]