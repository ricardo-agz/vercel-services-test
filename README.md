# Multi-Framework API Project

This project contains three API implementations using different frameworks:

| Framework | Language | Port | Directory |
|-----------|----------|------|-----------|
| FastAPI   | Python   | 8001 | `/fastapi-api` |
| Flask     | Python   | 8002 | `/flask-api` |
| Express   | Node.js  | 8003 | `/express-api` |

## Quick Start

### FastAPI
```bash
cd fastapi-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

### Flask
```bash
cd flask-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Express
```bash
cd express-api
npm install
npm start
```

## API Endpoints

Each API exposes the same endpoints for comparison:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Health check |
| GET | `/items` | List all items |
| GET | `/items/:id` | Get item by ID |
| POST | `/items` | Create new item |

