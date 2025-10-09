
# Stage 1: Build the React application
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with a lightweight web server
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally to serve the static files
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
