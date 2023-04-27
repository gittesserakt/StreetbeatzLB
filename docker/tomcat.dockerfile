FROM alpine:latest

# Install Git and Node.js npm OpenJDK Gradle and Maven
RUN apk add --update git nodejs npm openjdk17-jdk gradle maven

RUN mkdir "/opt/tomcat/" \
    && cd "/opt/tomcat/" \
    && wget "https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.8/bin/apache-tomcat-10.1.8.tar.gz" \
    && tar xvzf apache-tomcat-10.1.8.tar.gz --strip-components 1 --directory /opt/tomcat



# Clone the backend code
WORKDIR streetbeatzlbwork
#RUN sleep 1200
RUN git clone https://github.com/gittesserakt/StreetbeatzLB.git && cd ./StreetbeatzLB && git checkout dev
# Build the backend with Gradle
RUN cd ./StreetbeatzLB/StreetbeatzLB_Backend && gradle bootWar

# Copy the backend WAR file to Tomcat
RUN cp ./StreetbeatzLB/StreetbeatzLB_Backend/build/libs/StreetbeatzLB_Backend-0.0.1-SNAPSHOT.war /opt/tomcat/webapps

RUN cd ./StreetbeatzLB/StreetbeatzLB_Frontend && mvn clean install && cp ./target/maven-angular-app.war /opt/tomcat/webapps/

# Install Angular CLI and dependencies
#RUN npm install -g @angular/cli && npm install

# Build the frontend
#RUN ng build --output-path=/tmp/frontend

# Expose the default Tomcat port
#Ich muss mich noch einlesen wie ich zwei .war Dateien auf einem Tomcat laufen lassen kann
EXPOSE 8080:8080
EXPOSE 4200:4200

# Add Tomcat to the PATH
ENV PATH=$PATH:/usr/local/tomcat/bin

# Start Tomcat and run in the foreground
CMD ["/opt/tomcat/bin/catalina.sh", "run"]
