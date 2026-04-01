# Parcial – Sistema de Gestión Empresarial (CRUD)

Aplicación **Node.js + Express** conectada a **Supabase (Postgres)**.

- El **frontend** (HTML/JS/CSS) se sirve como estático desde `public/`
- El **backend** expone endpoints REST (Express) en `/employees`, `/departments`, `/projects`, `/auth`, etc.

## ✅ Demo desplegada (Railway)

URL pública:

- <https://parcial1pruebas-production.up.railway.app/>

## 🧪 Cómo probar (para otras personas)

1) Entra al login: `/index.html`
2) Inicia sesión con un usuario existente
3) Prueba los módulos:

- Clientes/Empleados: `/employees.html`
- Departamentos: `/departments.html`
- Proyectos: `/projects.html`

### Credenciales de prueba

- **Admin demo**: `pedronavaja123@gmail.com` / `pedronavaja1234?`
- **Empleado demo**: `santiagrtuaibzo@gmail.com` / `prubas12345?`

## 🧭 Endpoints principales

Base URL (Railway): `https://parcial1pruebas-production.up.railway.app`

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/create-user` (requiere rol `admin`)

### Employees / Clientes

- `GET /employees` (requiere token)
- `POST /employees` (requiere token)
- `GET /employees/:id`
- `PUT /employees/:id`
- `DELETE /employees/:id`

### Departments

- `GET /departments`
- `POST /departments`
- `PUT /departments/:id`
- `DELETE /departments/:id`

### Projects

- `GET /projects`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`

## 🧑‍💻 Ejecutar en local

Requisitos:

- Node.js 18+

Instalar:

```bash
npm install
```

Configurar `.env` (puedes copiar `.env.example`):

```ini
SUPABASE_URL=TU_SUPABASE_URL
SUPABASE_KEY=TU_SUPABASE_ANON_KEY
PORT=3000

# Opcional si tu frontend estará en otro dominio
# CORS_ORIGINS=http://localhost:3000
CORS_ORIGINS=
```

Ejecutar:

```bash
npm start
```

Abre:

- <http://localhost:3000/index.html>

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
