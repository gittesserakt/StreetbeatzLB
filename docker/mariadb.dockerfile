FROM mariadb:latest

# Copy SQL scripts to initialize database
ADD ./init_streetbeatzdb.sql /docker-entrypoint-initdb.d/ddl.sql
COPY ./privileges.sql /docker-entrypoint-initdb.d/

