steps = [
    [
        ### Create table
        """
        CREATE TABLE categories (
            id SERIAL NOT NULL PRIMARY KEY,
            category VARCHAR(50) NOT NULL
        );
        """,

        ### Drop table
        """
        DROP TABLE categories;
        """
    ]
]