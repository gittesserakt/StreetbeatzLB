FROM nginx:latest

# Remove default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration file to container
COPY nginx.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
