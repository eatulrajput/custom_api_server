# Custom Book API with FastAPI: Book Manager
![Book Manager](https://github.com/user-attachments/assets/ed060915-f3d1-4a97-b031-80fe850d9555)


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

---

## Backend Testing

For backend testing, I used Pytest. Pytest is a versatile and powerful testing framework for Python that simplifies the process of writing and running tests. It's known for its ease of use, clean syntax, and ability to handle a wide range of testing needs, from simple unit tests to complex functional and integration tests. Pytest's features like assertion introspection, fixtures, and plugin support contribute to its popularity among Python developers

### Manual Testing Result: 

Click Here - [Link](https://docs.google.com/spreadsheets/d/1BAAdMUCMpejcxzg6ULm1mBoXT5IMFwEZJgyCsTvNVZA/edit?usp=sharing)

### Unit Testing:

![Unit Testing](https://github.com/user-attachments/assets/6e2502b7-f83d-43f6-a569-76fa50fa6486)

### Integration Testing:

![Integrating Testing](https://github.com/user-attachments/assets/a17eba33-6658-4678-adad-a1767e8be33c)

### API Testing:

![API Testing](https://github.com/user-attachments/assets/f8ff1d04-cae9-4774-bbd4-40a90a7e380a)



---
## Coverage Report

![Screenshot 1](https://github.com/user-attachments/assets/ed5e0ce8-6e18-4d36-9b28-086170f30354)

![Screenshot 2](https://github.com/user-attachments/assets/b9e003ec-1abf-4702-b393-30225a5d78a9)

![Screenshot 3](https://github.com/user-attachments/assets/30ffb36c-1cb3-4bfb-8199-29a1e3f4b616)

---
<<<<<<< HEAD
## Frontend Testing
Using Vitest for frontend testing, Vitest is a fast and modern JavaScript testing framework built on top of Vite, a build tool for modern web development. It's designed for unit, integration, and component testing, offering a seamless experience with Vite and compatibility with Jest's API. Vitest aims to provide a fast and efficient testing experience, especially for projects using Vite, with features like hot module replacement and smart watch mode.

### Components Tests

![Components Test](https://github.com/user-attachments/assets/b418dab9-f7f3-4112-882f-f322ffaedc24)

### Unit Tests

![Unit Tests](https://github.com/user-attachments/assets/841a736a-2061-4025-a092-ac454d3b3af2)

## Coverage Report

![Coverage Report](https://github.com/user-attachments/assets/35119acb-ac95-443b-8af8-c24a297ab9c0)




=======
### How to generate OpenAPI Schema

> Method 1

Run your app:
```python
uvicorn app.main:app --reload
```

Then run this curl command in another terminal:
```bash
curl http://localhost:8000/openapi.json -o openapi.json
```

This creates an `openapi.json` file in your project directory.

> Method 2

Another way to create OpenAPI schema is doing it manually

```python
# export_openapi.py
from fastapi.openapi.utils import get_openapi
from main import app  # Make sure the correct app is imported
import json

schema = get_openapi(
    title=app.title,
    version=app.version,
    description=app.description,
    routes=app.routes,
)

with open("openapi.json", "w") as f:
    json.dump(schema, f, indent=2)

```
>>>>>>> adb73cd (Add OpenAPI, Update Readme, Add Render)
