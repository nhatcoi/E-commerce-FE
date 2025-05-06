# Use Nginx as base image for serving content
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from local dist folder
COPY dist .

# Expose port 80
EXPOSE 80

# Container runs nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]