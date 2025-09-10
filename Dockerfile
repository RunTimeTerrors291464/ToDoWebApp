# Choose the code environment.
FROM node:20-alpine

# Set the working directory.
WORKDIR /app

# Copy the package.json and package-lock.json files.
COPY package.json ./

# Run the command to install the dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Run the command to build the application.
RUN npm run build

# Expose the port.
EXPOSE 3000

# Run the command to start the application.
CMD ["npm", "run", "start:prod"]