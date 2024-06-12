# Install dependencies only when needed
FROM node:18-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY bin/check-node.sh ./bin/check-node.sh
COPY bin/check-npm.sh ./bin/check-npm.sh
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set the environment to build the application
ARG ENVIRONMENT=development

# Build the application
RUN \
  if [ -f yarn.lock ]; then yarn run build:${ENVIRONMENT}; \
  elif [ -f package-lock.json ]; then npm run build:${ENVIRONMENT}; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build:${ENVIRONMENT}; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Use Nginx as the production server
FROM nginxinc/nginx-unprivileged:1.25.4

USER nginx

# Set the working directory in the container
WORKDIR /usr/share/nginx/html
# Copy the built React app to Nginx's web server directory
COPY --from=builder /app/dist .
# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# Copy the custom Nginx configuration file
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
# Copy the default environment variables to the web server directory
# COPY env.js /usr/share/nginx/html/env.js

EXPOSE 8080
USER nginx

# Start Nginx and run it in the foreground
CMD ["/bin/bash", "-c", "whoami && nginx -g \"daemon off;\""]