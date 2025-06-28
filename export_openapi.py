# export_openapi.py
from fastapi.openapi.utils import get_openapi
from app.main import app  # Make sure the correct app is imported
import json

schema = get_openapi(
    title=app.title,
    version=app.version,
    description=app.description,
    routes=app.routes,
)

with open("openapi.json", "w") as f:
    json.dump(schema, f, indent=2)
