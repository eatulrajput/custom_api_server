# tests/integration/test_database.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app import crud, schemas

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(bind=engine)

@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    yield db
    db.close()

def test_create_and_get_book(db):
    book_data = schemas.BookCreate(
        title="Integration Book",
        author="Tester",
        published_year=2023,
        genre="Non-Fiction"
    )
    book = crud.create_book(db, book_data)

    assert book.id is not None
    books = crud.get_books(db)
    assert len(books) == 1
    assert books[0].title == "Integration Book"
    assert books[0].author == "Tester"
    assert books[0].published_year == 2023
    assert books[0].genre == "Non-Fiction"
