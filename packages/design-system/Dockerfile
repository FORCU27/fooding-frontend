# Build stage
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

# Enable corepack for yarn
RUN corepack enable

# Set working directory
WORKDIR /app

# # Copy root package files
COPY . .

# Install dependencies
RUN yarn install

# Copy only necessary source code
# COPY packages/design-system ./packages/design-system

# Build Storybook
RUN yarn workspace @repo/design-system build-storybook

# Production stage
FROM nginx:1.25-alpine

# Copy built Storybook files
COPY --from=builder /app/packages/design-system/storybook-static /usr/share/nginx/html

# Copy nginx configuration
COPY packages/design-system/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 