FROM mariadb:latest

VOLUME /data

# append sample data to database
RUN if [ "$DB_SAMPLE_DATA" = "true" ]; then \
      echo "Adding sample data to database" \
      cat /data/StreetbeatzLB/Deployment/Database/sample_data.sql >> /data/StreetbeatzLB/Deployment/Database/init_streetbeatzlb.sql \
    fi

# Copy SQL scripts to initialize database
COPY mariadb-sb/init_streetbeatzdb.sql /docker-entrypoint-initdb.d/ddl.sql
COPY mariadb-sb/privileges.sql /docker-entrypoint-initdb.d/