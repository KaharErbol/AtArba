from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.items import (
    Error,
    ItemIn, 
    ItemRepository,
    ItemOut,
)

router = APIRouter()

@router.post("/items", response_model=Union[ItemOut, Error])
def create_item(
    # python type hint
    item: ItemIn,
    response: Response,
    repo: ItemRepository = Depends(),
    ): 
    response.status_code = 400
    # print("Item", item)
    # print("Listed Date", item.listed_date.month)
    return repo.create(item)

@router.get("/items", response_model=Union[Error,List[ItemOut]])
def get_all(
    repo: ItemRepository = Depends(),
):
    return repo.get_all()

@router.put("/items/{item_id}", response_model=Union[ItemOut, Error])
def update_item(
    item_id: int,
    item: ItemIn,
    repo: ItemRepository = Depends(),
) -> Union[Error, ItemOut]:
    return repo.update(item_id, item)

@router.delete("/items/{item_id}", response_model=bool)
def delete_item(
    item_id: int,
    repo: ItemRepository = Depends(),
) -> bool:
    return repo.delete(item_id)

@router.get("/items/{item_id}", response_model=Optional[ItemOut])
def get_one_item(
    item_id: int,
    response: Response,
    repo: ItemRepository = Depends(),
) -> ItemOut:
    item = repo.get_one(item_id)
    if item is None:
        response.status_code = 404
    return item
