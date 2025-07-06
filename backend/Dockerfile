# Use Node.js as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your backend code
COPY . .

# Tell Docker which port to expose
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
