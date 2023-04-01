from fastapi import APIRouter, Depends
from queries.items import (
    ItemIn, 
    ItemRepository,
    ItemOut,
)

router = APIRouter()

@router.post("/items", response_model=ItemOut)
def create_item(
    # python type hint
    item: ItemIn,
    repo: ItemRepository = Depends()
    ): 
    # print("Item", item)
    # print("Listed Date", item.listed_date.month)
    return repo.create(item)
