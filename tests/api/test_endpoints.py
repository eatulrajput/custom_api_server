# tests/api/test_endpoints.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_book():
    response = client.post("/books/", json={
        "title": "Test Book",
        "author": "Test Author",
        "published_year": 2024,
        "genre": "Fiction"
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Test Book"

def test_get_books():
    response = client.get("/books/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_nonexistent_book():
    response = client.get("/books/999")
    assert response.status_code == 404
