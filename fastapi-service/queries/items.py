from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

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
    def get_one(self, item_id: int) -> Optional[ItemOut]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        SELECT id
                            , item_name
                            , image_url
                            , item_description
                            , category
                            , brand
                            , username
                            , item_price
                            , listed_date
                        FROM items
                        WHERE id = %s
                        """,
                        [item_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_item_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get the item"}
    
    def delete(self, item_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM items
                        WHERE id = %s
                        """,
                        [item_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False


    def update(self, item_id: int, item: ItemIn) -> Union[ItemOut, Error]:
        try:
            # connect to the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        """
                        UPDATE items
                        SET item_name = %s
                          , image_url = %s
                          , item_description = %s
                          , category = %s
                          , brand = %s
                          , username = %s
                          , item_price = %s
                          , listed_date = %s
                        WHERE id = %s
                        """,
                        [
                            item.item_name,
                            item.image_url,
                            item.item_description,
                            item.category,
                            item.brand,
                            item.username,
                            item.item_price,
                            item.listed_date,
                            item_id
                        ]
                    )
                    return self.item_in_to_out(item_id, item)
        except Exception as e:
            print(e)
            return {"message": "Could not update the item"}

        


    def get_all(self) -> Union[Error,List[ItemOut]]:
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
                            item_name,
                            image_url,
                            item_description,
                            category,
                            brand, 
                            username, 
                            item_price, 
                            listed_date
                        FROM items
                        ORDER BY listed_date
                        """
                    )
                    # result = []
                    # for record in db:
                    #     item = ItemOut(
                    #         id=record[0],
                    #         item_name=record[1],
                    #         image_url=record[2],
                    #         item_description=record[3],
                    #         category=record[4],
                    #         brand=record[5], 
                    #         username=record[6], 
                    #         item_price=record[7], 
                    #         listed_date=record[7],
                    #     )
                    #     result.append(item)
                    items = [
                        self.record_to_item_out(record)
                        for record in db
                    ]
                    return items

        except Exception as e:
            print(e)
            return {"message": "Could not get all items"}

    def create(self, item: ItemIn) -> ItemOut:
        try: 
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
                    # old_data = item.dict()
                    # return ItemOut(id=id, **old_data)
                    return self.item_in_to_out(id, item)
        except Exception:
            print(Exception)
            return {"message": "Create did not work"}
    
    def item_in_to_out(self, id: int, item: ItemIn):
        old_data = item.dict()
        return ItemOut(id=id, **old_data)

    def record_to_item_out(self, record):
        return ItemOut(
            id=record[0],
            item_name=record[1],
            image_url=record[2],
            item_description=record[3],
            category=record[4],
            brand=record[5], 
            username=record[6], 
            item_price=record[7], 
            listed_date=record[7],
        )