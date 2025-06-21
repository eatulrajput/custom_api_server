# Custom Book API with FastAPI

## Features

- 4 endpoints: Create, Read, Update, Delete books
- Uses FastAPI + SQLite + SQLAlchemy
- Swagger UI auto-docs available

## Setup

```bash
git clone <repo>
cd custom_api_server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
## API Endpoints

```bash
| POST    | /books/     | → Create a book
| GET     | /books/     | → List all books
| GET     | /books/{id} | → Get one book
| PUT     | /books/{id} | → Update a book
| DELETE  | /books/{id} | → Delete a book
```

## Sample Request
```bash
curl -X POST http://127.0.0.1:8000/books/ -H "Content-Type: application/json" -d '{"title": "1984", "author": "George Orwell", "published_year": 1949, "genre": "Dystopian"}'

Step 7: Run the API Server
```python
uvicorn app.main:app --reload
```
> Open browser: http://127.0.0.1:8000/docs for Swagger UI