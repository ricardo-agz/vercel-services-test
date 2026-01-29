import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = 8003;

interface Item {
  id: number;
  name: string;
  price: number;
}

// In-memory storage
const itemsDb = new Map<number, Item>([
  [1, { id: 1, name: 'Laptop', price: 999.99 }],
  [2, { id: 2, name: 'Keyboard', price: 79.99 }],
  [3, { id: 3, name: 'Mouse', price: 29.99 }],
]);
let nextId = 4;

function json(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const path = url.pathname;
  const method = req.method;

  // GET /
  if (method === 'GET' && path === '/') {
    return json(res, { message: 'Welcome to Node HTTP Server!', framework: 'http' });
  }

  // GET /health
  if (method === 'GET' && path === '/health') {
    return json(res, { status: 'healthy', service: 'node-http-api' });
  }

  // GET /items
  if (method === 'GET' && path === '/items') {
    return json(res, Array.from(itemsDb.values()));
  }

  // GET /items/:id
  const itemMatch = path.match(/^\/items\/(\d+)$/);
  if (method === 'GET' && itemMatch) {
    const id = parseInt(itemMatch[1], 10);
    const item = itemsDb.get(id);

    if (!item) {
      return json(res, { error: 'Item not found' }, 404);
    }

    return json(res, item);
  }

  // POST /items
  if (method === 'POST' && path === '/items') {
    try {
      const body = await parseBody(req);
      const { name, price } = body;

      if (!name || price === undefined) {
        return json(res, { error: 'Missing required fields: name, price' }, 400);
      }

      const newItem: Item = {
        id: nextId,
        name: name as string,
        price: parseFloat(String(price)),
      };

      itemsDb.set(nextId, newItem);
      nextId++;

      return json(res, newItem, 201);
    } catch {
      return json(res, { error: 'Invalid JSON body' }, 400);
    }
  }

  // 404 for unmatched routes
  json(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => {
  console.log(`Node HTTP API running on http://localhost:${PORT}`);
});
