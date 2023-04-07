steps =[
    [
        ## Create the table
        """
        CREATE TABLE users (
            id SERIAL NOT NULL PRIMARY KEY, 
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            zip SMALLINT NOT NULL,
            hashed_password VARCHAR(250) NOT NULL,
            avatar_url VARCHAR(256)
        );
        """,

        ## Drop the table
        """
        DROP TABLE users;
        """
    ],
    [
        ## Create the table
        """
        CREATE TABLE status (
            id SERIAL NOT NULL PRIMARY KEY,
            states VARCHAR(10) NOT NULL
        );
        """,

        ## Drop the table
        """
        DROP TABLE status;
        """
    ]
]