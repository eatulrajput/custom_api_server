# tests/unit/test_crud.py

import pytest
from app import crud, schemas, models

class FakeBook:
    def __init__(self, id, title, author, year, genre):
        self.id = id
        self.title = title
        self.author = author
        self.published_year = year
        self.genre = genre

class FakeDB:
    def __init__(self):
        self.books = []
        self.last_id = 0

    def add(self, book):
        self.last_id += 1
        book.id = self.last_id
        self.books.append(book)

    def commit(self): pass
    def refresh(self, book): pass

    def query(self, model):
        class Query:
            def __init__(inner_self, outer):
                inner_self.outer = outer
                inner_self.filtered_id = None

            def all(inner_self):
                return inner_self.outer.books

            def filter(inner_self, condition):
                inner_self.filtered_id = condition.right.value
                return inner_self

            def first(inner_self):
                for book in inner_self.outer.books:
                    if book.id == inner_self.filtered_id:
                        return book
                return None

        return Query(self)

    def delete(self, book):
        self.books.remove(book)

@pytest.fixture
def book_data():
    return schemas.BookCreate(
        title="Test Book",
        author="Author Name",
        published_year=2023,
        genre="Fantasy"
    )

def test_create_book(book_data):
    db = FakeDB()
    book = crud.create_book(db, book_data)
    assert book.title == "Test Book"
    assert len(db.books) == 1

def test_get_book(book_data):
    db = FakeDB()
    created = crud.create_book(db, book_data)
    result = crud.get_book(db, created.id)
    assert result is not None
    assert result.title == "Test Book"

def test_update_book(book_data):
    db = FakeDB()
    created = crud.create_book(db, book_data)
    updated_data = schemas.BookCreate(
        title="Updated Book",
        author="Updated Author",
        published_year=2024,
        genre="Science Fiction"
    )
    result = crud.update_book(db, created.id, updated_data)
    assert result.title == "Updated Book"
    assert result.published_year == 2024

def test_delete_book_success(book_data):
    db = FakeDB()
    created = crud.create_book(db, book_data)
    deleted = crud.delete_book(db, created.id)
    assert deleted is not None
    assert len(db.books) == 0

def test_delete_book_not_found():
    db = FakeDB()
    deleted = crud.delete_book(db, book_id=999)
    assert deleted is None
