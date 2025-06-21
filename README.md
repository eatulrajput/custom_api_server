# Custom Book API with FastAPI: Book Manager

## Features

- 4 endpoints: Create, Read, Update, Delete books
- Uses FastAPI + SQLite + SQLAlchemy
- Swagger UI auto-docs available
- Add, edit, delete books
- Responsive UI with ShadCN components
- Edit-in-place with live form updates
- Dark glassy aesthetic with backdrop-blur
- Full CORS-enabled backend using FastAPI

## Tech Stack Used

```bash
| Frontend               | Backend           |      Database |
--------------------------------------------------------------
| React + Vite           | FastAPI(Python)   |     SQLite    |
| ShadCN + TailwindCSS   | SQLAlchemy        |               | 
```

## Backend Setup

```bash
git clone <repo>

cd custom_api_server

python -m venv venv # Create virtual env
source venv/bin/activate # Activate virtual env

# Install the requirements
pip install -r requirements.txt

# Run the API
uvicorn app.main:app --reload
```
> Open browser: http://127.0.0.1:8000/docs for Swagger UI


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
```
## Frontend Setup

```bash
# Install Dependencies
cd book-frontend
npm install

# Start Frontend
npm run dev
```
> Default URL: http://localhost:5174

## CORS Support

FastAPI allows CORS from http://localhost:5174:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    ...
)
```

## Further Plans
- Search and Filter
- Pagination
- Auth using JWT
- Export Book List
- Hosting somewhere over internet for users