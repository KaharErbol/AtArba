from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class CategoryIn(BaseModel):
    category: str

class CategoryOut(BaseModel):
    id: int
    category: str


class CategoryRepository:
    def create(self, category: CategoryIn) -> CategoryOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO categories
                            (
                                category
                            )
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [
                            category.category
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = category.dict()
                    return CategoryOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Creating category did not work"}
        
    def get_all(self) -> Union[Error, List[CategoryOut]]:
        try:
             # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        """
                        SELECT
                            id,
                            category
                        FROM categories
                        """
                    )
                    result = []
                    for record in db:
                        print(record)
                        category = CategoryOut(id=record[0], category=record[1])
                        result.append(category)
                    return result
                
        except Exception as e:
            print(e)
            return {"message": "Could not get all categories"}