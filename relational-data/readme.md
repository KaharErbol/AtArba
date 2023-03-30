# PostgreSQL database
To support multiple database instances in a single PostgreSQL RDBMS, we use a script named create-multiple-databases.sh to do that for us.

Note: The script will only create multiple databases when there are no other databases already created. If you need to add another database for a new service at a later date, please make sure to follow the instructions below.

To easily use PostgreSQL in your application, please add the following directories and files to your project structure.

1. Create a directory named relational-data in the top level of your project

2. Create a file named create-multiple-databases.sh in the relational-data directory with this content
3. Create a file named Dockerfile.dev in the relational-data directory and add this content to it
4. In your docker-compose.yaml file, add a volume for the PostgreSQL RDBMS to use to store its data
 ```
 volumes:
    postgres-data:
        external: true
    # other volumes...
 ```
 5. In your ***docker-compose.yaml*** file, add a section for the PostgreSQL RDBMS in your services section, putting the names of your databases in the **environment** section for the **POSTGRES_MULTIPLE_DATABASES** variable as a comma-separated list, like "accounts,inventory,bowls" **without** the quotation marks
 6. Before running docker compose up, you'll need to create the postgres-data volume
`docker volume create postgres-data`
For each name you add to POSTGRES_MULTIPLE_DATABASES, it will create a user and database with the name from the list with the password "password".
