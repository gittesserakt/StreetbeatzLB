FROM mariadb:latest

VOLUME /data

# Copy SQL scripts to initialize database
COPY mariadb-sb/init_streetbeatzdb.sql /docker-entrypoint-initdb.d/ddl.sql
COPY mariadb-sb/privileges.sql /docker-entrypoint-initdb.d/