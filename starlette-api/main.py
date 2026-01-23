from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.requests import Request

# In-memory storage
items_db: dict[int, dict] = {
    1: {"id": 1, "name": "Laptop", "price": 999.99},
    2: {"id": 2, "name": "Keyboard", "price": 79.99},
    3: {"id": 3, "name": "Mouse", "price": 29.99},
}
next_id = 4


async def root(request: Request) -> JSONResponse:
    return JSONResponse({"message": "Welcome to Starlette!", "framework": "Starlette"})


async def health_check(request: Request) -> JSONResponse:
    return JSONResponse({"status": "healthy", "service": "starlette-api"})


async def list_items(request: Request) -> JSONResponse:
    return JSONResponse(list(items_db.values()))


async def get_item(request: Request) -> JSONResponse:
    item_id = int(request.path_params["item_id"])
    if item_id not in items_db:
        return JSONResponse({"error": "Item not found"}, status_code=404)
    return JSONResponse(items_db[item_id])


async def create_item(request: Request) -> JSONResponse:
    global next_id
    body = await request.json()
    
    name = body.get("name")
    price = body.get("price")
    
    if not name or price is None:
        return JSONResponse(
            {"error": "Missing required fields: name, price"}, 
            status_code=400
        )
    
    new_item = {"id": next_id, "name": name, "price": float(price)}
    items_db[next_id] = new_item
    next_id += 1
    
    return JSONResponse(new_item, status_code=201)


routes = [
    Route("/", root),
    Route("/health", health_check),
    Route("/items", list_items, methods=["GET"]),
    Route("/items", create_item, methods=["POST"]),
    Route("/items/{item_id:int}", get_item),
]

app = Starlette(routes=routes)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
