from fastapi.testclient import TestClient
from main import app
from queries.items import ItemRepository

client = TestClient(app)


class EmptyItemRepository:
    def get_all(self):
        return []

class CreateItemRepository:
    def create(self, item):
        result = {
                "id": 1,
                "item_name": "test",
                "image_url": "string",
                "item_description": "string",
                "category": "Battery",
                "brand": "string",
                "username": "string",
                "item_price": 99,
                "listed_date": "2023-04-10"
                }
        result.update(item)
        return result

def test_get_all():
    # Arrange
    app.dependency_overrides[ItemRepository] = EmptyItemRepository

    # Act
    response = client.get("/items")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_item():
    # Arrange
    app.dependency_overrides[ItemRepository] = CreateItemRepository
    
    # Act
    json = {
         "item_name": "test",
        "image_url": "string",
        "item_description": "string",
        "category": "Battery",
        "brand": "string",
        "username": "string",
        "item_price": 99,
        "listed_date": "2023-04-10"
    }

    expected = {
                "id": 1,
                "item_name": "test",
                "image_url": "string",
                "item_description": "string",
                "category": "Battery",
                "brand": "string",
                "username": "string",
                "item_price": 99,
                "listed_date": "2023-04-10"
            }

    response = client.post("/items", json=json)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1