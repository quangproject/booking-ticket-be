# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Set permissions and switch to a non-root user
RUN chown -R node:node /app
USER node

# Install app dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app using nodemon
CMD ["node", "src/index.js"]
