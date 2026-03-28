# Parcial – Sistema de Gestión Empresarial (CRUD)

Backend en **Node.js + Express** conectado a **Supabase (Postgres)**, con dashboards sencillos en **HTML/JS** servidos desde la carpeta `public/`.

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
