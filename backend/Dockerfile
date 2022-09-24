#Specify a base image
FROM node:alpine

#Copy everything from current directory to container
WORKDIR /usr/app

#Copy only package.json at first if u didnt want to reinstall everything
COPY ./package.json ./

#Install dependencies 
RUN npm install

#then copy everything else
COPY ./ ./

#Default command
CMD ["npm", "start"]