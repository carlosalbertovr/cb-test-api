import express, { Request, Response } from "express";
import { prisma } from "./prisma";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("ok");
});

app.get("/api/info", (_req: Request, res: Response) => {
  res.status(200).json({
    project: "REST API académica",
    version: "1.0.0",
    orm: "Prisma",
    database: "PostgreSQL",
    serverTime: new Date().toISOString()
  });
});

app.get("/api/users", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      todos: true
    },
    orderBy: {
      id: "asc"
    }
  });

  res.status(200).json(users);
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email } = req.body as { name?: string; email?: string };

  if (!name || !email) {
    return res.status(400).json({ message: "name y email son obligatorios" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    });

    return res.status(201).json(user);
  } catch {
    return res.status(409).json({ message: "No fue posible crear el usuario" });
  }
});

app.get("/api/todos", async (_req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    include: {
      user: true
    },
    orderBy: {
      id: "asc"
    }
  });

  res.status(200).json(todos);
});

app.post("/api/todos", async (req: Request, res: Response) => {
  const { title, description, completed, userId } = req.body as {
    title?: string;
    description?: string;
    completed?: boolean;
    userId?: number;
  };

  if (!title || !userId) {
    return res.status(400).json({ message: "title y userId son obligatorios" });
  }

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        completed: completed ?? false,
        userId
      }
    });

    return res.status(201).json(todo);
  } catch {
    return res.status(400).json({ message: "No fue posible crear el todo" });
  }
});

app.patch("/api/todos/:id/toggle", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id inválido" });
  }

  const existingTodo = await prisma.todo.findUnique({ where: { id } });

  if (!existingTodo) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  const updated = await prisma.todo.update({
    where: { id },
    data: {
      completed: !existingTodo.completed
    }
  });

  return res.status(200).json(updated);
});

app.use((error: Error, _req: Request, res: Response, _next: unknown) => {
  console.error(error);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
