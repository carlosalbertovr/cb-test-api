import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("ok");
});

app.get("/api/info", (_req: Request, res: Response) => {
  res.status(200).json({
    project: "REST API académica",
    version: "1.0.0",
    author: "Estudiante",
    topics: ["TypeScript", "Express", "HTTP"],
    serverTime: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
