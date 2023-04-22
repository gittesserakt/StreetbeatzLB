FROM tomcat:latest

# Install Git and Node.js
RUN apt-get update && apt-get install -y git nodejs npm

# Clone the backend code
RUN git clone https://github.com/gittesserakt/StreetbeatzLB/tree/main/StreetbeatzLB_Backend /backend

# Change to the backend directory
WORKDIR /backend

# Build the backend with Gradle
RUN apt-get update && apt-get install -y gradle && gradle build -x test

# Clone the frontend code
RUN git clone https://github.com/gittesserakt/StreetbeatzLB/tree/main/StreetbeatzLB_Frontend /frontend

# Change to the frontend directory
WORKDIR /frontend

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli && npm install

# Build the frontend
RUN ng build --prod --output-path=/tmp/frontend

# Copy the WAR files to Tomcat
RUN cp /backend/build/libs/StreetbeatzLB_Backend-*.war /usr/local/tomcat/webapps/ && \
    cp -R /tmp/frontend/* /usr/local/tomcat/webapps/StreetbeatzLB_Frontend/

# Expose the default Tomcat port
EXPOSE 8080

# Start Tomcat and run in the foreground
CMD ["catalina.sh", "run"]
