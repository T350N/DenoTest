import { Hono } from "jsr:@hono/hono";

const app = new Hono();

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

// Root endpoint
app.get("/", (c) => {
  return c.text("Hello from Deno!");
});

// Example of a GET endpoint
app.get("/api/users", (c) => {
  return c.json(users);
});

// Example of a POST endpoint
app.post("/api/users", async (c) => {
  const body = await c.req.json();
  const newUser = { id: Date.now(), ...body };
  users.push(newUser);
  return c.json(newUser, 201);
});

// Example of a PUT endpoint
app.put("/api/users/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  users = users.map((user) => (user.id === id ? { id, ...body } : user));
  return c.json({ id, ...body });
});

// Example of a DELETE endpoint
app.delete("/api/users/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  users = users.filter((user) => user.id !== id);
  c.status(204);
  return c.text("");
});

Deno.serve({ port: 3000, handler: app.fetch });

console.log("Hello, we are using port 3000, enjoy it!");