# Build stage
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom nginx config for React router if needed (optional for simple apps)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
