# StreetbeatzLB

A Progressive Web Application (PWA) for the Street Music Festival in Ludwigsburg

## Introduction
Welcome to StreetbeatzLB, a university group project developed for the "LabSWPS" lecture at the University of Heilbronn. This project aims to create an immersive and user-friendly Progressive Web Application (PWA) for the Street Music Festival in Ludwigsburg.

### Team Members
* [gittesserakt](https://github.com/gittesserakt/): Hannes Jetter
* [Holli777](https://github.com/Holli777): Nicolas Holl
* [Dennisdude](https://github.com/Dennisdude): Dennis Deifel
* [JxWorker](https://github.com/JxWorker): Michel Jouaux
* [Mousa-M](https://github.com/Mousa-M): Moutassem Mousa
* [memento-morty](https://github.com/memento-morty): Dominik Buzov

# Deployment of the application on a production server

This document describes how to deploy the application on a production server running docker. It is assumed that the server is running a linux distribution (tested on Ubuntu 22.04) and that the user has knowledge of linux, docker and a general understanding of application deployment and server administration. Of course, you can modify the deployment script and application to fit your needs.

## Prerequisites

If the application is deployed on a production server, the following prerequisites need to be met:

- [Docker](https://docs.docker.com/install/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Ability to run bash scripts
- Server with internet access
- Domain name pointing to the server
- Valid SSL certificate for the domain name
    - if you don't have a reverse proxy in front of the application that handles SSL handshake and certificate management, the deployment will create one for you using nginx, but you will need to provide valid ssl certificate files (in .pem and .key format) to the application
- Auth0 account and tenant with a valid configuration for the application
    - if you don't have an Auth0 account, you can create one for free [here](https://auth0.com/signup)

If one of the prerequisites is not met, the deployment will fail.

## Installation
(all commands are run in the root directory of the project and might need to be run with sudo depending on the configuration of the server)

### First time installation and building the application

1. Clone the repository on the server:
    ```bash
    # clone from github
    git clone https://github.com/gittesserakt/StreetbeatzLB.git
    
    # or clone from bitbucket (university repository not available to the public)
    git clone 
    ```

2. Run the deployment script with the init argument (this will create the necessary files and folders):
    ```bash
    ./streetbeatzlb_prod.sh init
    ```

3. Edit the .env file in the generated Environment directory of the project and fill in the necessary values.
4. Run the deployment script with the build argument (this creates a docker container that will build the application and copy the files to the necessary folders):
    ```bash
    ./streetbeatzlb_prod.sh build
    ```

### Starting the application

- Run the deployment script with the start argument (this will start docker-compose in detached mode):
    ```bash
    ./streetbeatzlb_prod.sh start
    ```

### Stopping the application

- Run the deployment script with the stop argument (this will stop docker-compose and removes all containers, images, etc.):
    ```bash
    ./streetbeatzlb_prod.sh stop
    ```

### Updating the application

1. Stop the application (see above)
2. Pull the latest version of the repository
3. Run the deployment script with the build argument (see above)
4. Start the application (see above)
5. If you have your own reverse proxy in front of the application, you might need to restart it as well

### Uninstalling the application

1. Stop the application (see above)
2. Now you can just delete the project folder and all files and folders created by the deployment script

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/), which grants permission for anyone to view, use, modify, and distribute the code. However, please note that the creators and contributors of StreetbeatzLB are not liable for any damages or issues that may arise from the use or deployment of this application. We do not provide support or maintenance for deploying, hosting, or running the application on your own servers. By using this code, you acknowledge and agree that you assume all responsibility and risk associated with deploying and running the application.