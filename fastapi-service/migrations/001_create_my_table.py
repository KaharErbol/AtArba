steps =[
    [
        ## Create the table
        """
        CREATE TABLE items (
            id SERIAL NOT NULL PRIMARY KEY, 
            item_name VARCHAR(100) NOT NULL,
            image_url VARCHAR(256),
            item_description TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            brand VARCHAR(50) NOT NULL,
            username VARCHAR(50) NOT NULL,
            item_price REAL NOT NULL,
            listed_date DATE NOT NULL
        );
        """,

        ## Drop the table
        """
        DROP TABLE items;
        """
    ]
]