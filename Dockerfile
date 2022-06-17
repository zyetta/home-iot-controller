# Base Image
FROM node:current

# Set Working Directory
WORKDIR /usr/src/app

# Copy Requirements & Download
COPY package.json ./
RUN npm install -g npm@8.12.2
RUN npm install

# Copy Source Files
COPY tsconfig.json ./
COPY index.ts ./
COPY .token.json ./
COPY .env ./
COPY src ./src

# List current Files
RUN ls -a

# Convert Files to JS
RUN npm run build

# Create Entry Point
CMD [ "node", "./dist/index.js" ]