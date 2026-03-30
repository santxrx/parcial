# Parcial – Sistema de Gestión Empresarial (CRUD)

Backend en **Node.js + Express** conectado a **Supabase (Postgres)**, con dashboards sencillos en **HTML/JS** servidos desde la carpeta `public/`.

## 🚄 Despliegue en Railway (frontend + backend juntos)

Este proyecto ya sirve el frontend como estático desde `public/`:

- `app.use(express.static("public"))`

Así que en Railway puedes desplegar **un solo servicio** (Express) y tendrás:

- Frontend: `https://TU-PROYECTO.up.railway.app/index.html`
- API: `https://TU-PROYECTO.up.railway.app/employees` (y demás)

### 1) Crear proyecto en Railway

Railway → New Project → Deploy from GitHub → elige este repo.

### 2) Variables de entorno

En Railway → Variables:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Opcional:

- `CORS_ORIGINS` (si vas a consumir la API desde otro dominio; si front+back están juntos, no es necesario)

> `PORT` no lo configures: Railway lo inyecta.

### 3) Start command

Usa:

- `npm run start:prod`

### 4) Abrir el sitio

Entra a la URL del servicio y abre `index.html`.

## ✅ Requisitos

- Node.js (recomendado: 18+)

## 📦 Instalación

```bash
npm install
```

## ▶️ Ejecutar

```bash
npm start
```

Por defecto levanta en: `http://localhost:3000`

> El servidor también sirve contenido estático desde `public/`.

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```ini
SUPABASE_URL=TU_SUPABASE_URL
SUPABASE_KEY=TU_SUPABASE_ANON_KEY
PORT=3000
```

## 🧭 Módulos y páginas

### Frontend

- `http://localhost:3000/index.html` (Login / landing)
- `http://localhost:3000/employees.html` (CRUD Empleados)
- `http://localhost:3000/departments.html` (CRUD Departamentos)
- `http://localhost:3000/projects.html` (CRUD Proyectos)

### API

- `GET/POST` `http://localhost:3000/employees`
- `GET/PUT/DELETE` `http://localhost:3000/employees/:id`

- `GET/POST` `http://localhost:3000/departments`
- `GET/PUT/DELETE` `http://localhost:3000/departments/:id`

- `GET/POST` `http://localhost:3000/projects`
- `GET/PUT/DELETE` `http://localhost:3000/projects/:id`

## 🗃️ Esquema de tablas

### `empleados`

Campos:

- `id`
- `nombre`
- `apellido`
- `email`
- `edad`
- `telefono`
- `activo`
- `salario`
- `fecha_nacimiento`
- `direccion`

### `departments`

Campos:

- `id`
- `created_at`
- `nombre`
- `presupuesto`

### `projects`

Campos:

- `id`
- `nombre`
- `presupuesto`

## 🧩 Estructura del proyecto

- `server.js`: servidor Express y registro de rutas
- `src/routes/`: endpoints por módulo
- `public/`: dashboards (HTML/JS/CSS) servidos como estático
