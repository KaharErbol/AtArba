from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.categories import (
    Error,
    CategoryIn,
    CategoryOut,
    CategoryRepository
)

router = APIRouter()

@router.post("/categories", response_model=Union[CategoryOut, Error])
def create_category(
    category: CategoryIn, 
    response: Response, 
    repo: CategoryRepository = Depends(),
    ):
    response.status = 400
    return repo.create(category)

@router.get("/categories", response_model=Union[Error, List[CategoryOut]])
def get_all(
    repo: CategoryRepository = Depends(),
):
    return repo.get_all()