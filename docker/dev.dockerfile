FROM mariadb:latest

ADD ./init_streetbeatzdb.sql /docker-entrypoint-initdb.d/ddl.sql
COPY ./privileges.sql /docker-entrypoint-initdb.d/