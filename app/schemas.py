from pydantic import BaseModel, ConfigDict

class BookBase(BaseModel):
    title: str
    author: str
    published_year: int
    genre: str

class BookCreate(BookBase):
    pass

class Book(BookBase):
    model_config = ConfigDict(from_attributes=True)
