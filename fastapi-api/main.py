from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="FastAPI Service",
    description="A sample FastAPI application",
    version="1.0.0",
    root_path="/fastapi-api"
)

# In-memory storage
items_db: dict[int, dict] = {
    1: {"id": 1, "name": "Laptop", "price": 999.99},
    2: {"id": 2, "name": "Keyboard", "price": 79.99},
    3: {"id": 3, "name": "Mouse", "price": 29.99},
}
next_id = 4


class ItemCreate(BaseModel):
    name: str
    price: float


class Item(BaseModel):
    id: int
    name: str
    price: float


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI!", "framework": "FastAPI"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "fastapi-api"}


@app.get("/items", response_model=list[Item])
async def list_items():
    return list(items_db.values())


@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return items_db[item_id]


@app.post("/items", response_model=Item, status_code=201)
async def create_item(item: ItemCreate):
    global next_id
    new_item = {"id": next_id, "name": item.name, "price": item.price}
    items_db[next_id] = new_item
    next_id += 1
    return new_item


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

