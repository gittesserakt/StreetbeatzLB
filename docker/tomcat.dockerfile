FROM alpine:latest

# Install Git and Node.js OpenJDK Gradle
RUN apk add --update git nodejs npm openjdk17-jdk gradle tomcat-native

# Change to the backend directory
WORKDIR /work

# Clone the backend code
RUN git clone https://github.com/gittesserakt/StreetbeatzLB.git
WORKDIR StreetbeatzLB
RUN git checkout dev
WORKDIR StreetbeatzLB_Backend

# Build the backend with Gradle
RUN gradle bootWar


###########################
#RUN sleep 1200            #please remove after testing
###########################


# Create tomcat directory
RUN mkdir /usr/local/tomcat/

# Create webapps directory
RUN mkdir /usr/local/tomcat/webapps/


# Copy the backend WAR file to Tomcat
RUN cp ./build/libs/StreetbeatzLB_Backend-*.war /usr/local/tomcat/webapps/

WORKDIR ../StreetbeatzLB_Frontend

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli && npm install

# Build the frontend
RUN ng build --output-path=/tmp/frontend

# Copy the frontend files to Tomcat
RUN cp -R /tmp/frontend/* /usr/local/tomcat/webapps/StreetbeatzLB_Frontend/

# Expose the default Tomcat port
EXPOSE 8080

# Start Tomcat and run in the foreground
CMD ["catalina.sh", "run"]
