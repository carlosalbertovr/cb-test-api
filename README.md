# API REST con TypeScript + Prisma + PostgreSQL

Proyecto académico de API REST usando Express y Prisma ORM con dos tablas relacionadas:

- `User`
- `Todo` (cada tarea pertenece a un usuario)

## Modelo de datos

La relación está definida en `prisma/schema.prisma`:

- `User 1 --- N Todo`

## Endpoints

- `GET /` → healthcheck
- `GET /api/info` → metadatos de la API
- `GET /api/users` → lista usuarios con sus todos
- `POST /api/users` → crear usuario
- `GET /api/todos` → lista todos con su usuario
- `POST /api/todos` → crear todo
- `PATCH /api/todos/:id/toggle` → alternar `completed`

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Crear variables de entorno:

```bash
cp .env.example .env
```

3. Crear/generar cliente de Prisma y migrar base de datos:

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Ejecutar en desarrollo:

```bash
npm run dev
```

## Scripts

- `npm run build`
- `npm run start`
- `npm run dev`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:studio`

## Ejemplos rápidos

```bash
curl http://localhost:3000/api/users

curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com"}'

curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Repasar Prisma","userId":1}'
```
