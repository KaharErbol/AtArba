from pydantic import BaseModel
from typing import Optional
from datetime import date
from queries.pool import pool


class ItemIn(BaseModel):
    item_name: str
    image_url: Optional[str]
    item_description: str
    category: str
    brand: str
    username: str
    item_price: float
    listed_date: date

class ItemOut(BaseModel):
    id: int
    item_name: str
    image_url: Optional[str]
    item_description: str
    category: str
    brand: str
    username: str
    item_price: float
    listed_date: date



class ItemRepository:
    def create(self, item: ItemIn) -> ItemOut:
        # connect to the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO items
                        (
                            item_name,
                            image_url,
                            item_description,
                            category,
                            brand, 
                            username, 
                            item_price, 
                            listed_date
                        )
                    VALUES
                        (%s,%s,%s,%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        item.item_name, 
                        item.image_url, 
                        item.item_description, 
                        item.category,
                        item.brand, 
                        item.username, 
                        item.item_price, 
                        item.listed_date
                    ]
                )
                id = result.fetchone()[0] #it's a tuple
                # Return new data
                # All BaseModel has dict() property
                old_data = item.dict()
                return ItemOut(id=id, **old_data)