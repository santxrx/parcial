# Historias de Usuario y Requisitos — Sistema de Gestión Empresarial

---

## 1) Actores (roles)

- **Administrador (admin):** gestiona clientes y crea usuarios del sistema.
- **Empleado (empleado):** consulta clientes; en backend puede operar sobre ciertos registros (por tipo) o sobre ruta `/clientes` según roles.

---

## 2) Historias de Usuario (HU)

### Autenticación y sesión

#### HU-01 — Iniciar sesión

Como **usuario** (admin/empleado/cliente), quiero **iniciar sesión con correo y contraseña**, para **acceder a los módulos del sistema según mi rol**.

**CA:**

1. Dado un correo/contraseña válidos, al presionar “Ingresar” el sistema autentica contra Supabase.
2. Si el login es exitoso, el sistema guarda `token` y `rol` en el almacenamiento local del navegador.
3. Si el login es exitoso, el sistema redirige a la pantalla principal de clientes (`employees.html`).
4. Si el login falla, se muestra un mensaje de error comprensible.

#### HU-02 — Cerrar sesión

Como **usuario**, quiero **cerrar sesión**, para **salir del sistema y proteger mi información**.

**CA:**

1. Al presionar “Cerrar sesión”, se elimina `token` y `rol` del almacenamiento local.
2. El usuario es redirigido a `index.html`.

### Administración de usuarios (solo admin)

#### HU-03 — Crear usuario del sistema

Como **administrador**, quiero **crear un usuario (email/contraseña) y asignarle un rol**, para **habilitar el acceso controlado al sistema**.

**CA:**

1. Solo usuarios con rol `admin` pueden acceder y ejecutar el formulario “Crear Usuario”.
2. Al enviar el formulario, el backend crea el usuario en Supabase Auth y registra su rol en la tabla `usuarios`.
3. Si se crea correctamente, el sistema muestra confirmación.
4. Si hay error (email repetido, contraseña inválida, etc.), se muestra el error.

### Gestión de clientes (pantalla “employees.html”)

#### HU-04 — Consultar clientes

Como **usuario autenticado**, quiero **ver la lista de clientes**, para **consultar su información**.

**CA:**

1. Si no hay token, el sistema redirige a `index.html`.
2. Con token válido, se muestra una tabla con los clientes.

#### HU-05 — Crear cliente

Como **administrador**, quiero **registrar un cliente**, para **mantener el listado actualizado**.

**CA:**

1. El formulario solicita nombre, apellido, email y demás campos configurados.
2. Al guardar, el registro aparece en la tabla.

#### HU-06 — Editar cliente

Como **administrador**, quiero **editar un cliente**, para **corregir o actualizar sus datos**.

**CA:**

1. Al presionar “Editar”, se cargan datos del cliente en el formulario.
2. Al guardar, la tabla refleja los cambios.

#### HU-07 — Eliminar cliente

Como **administrador**, quiero **eliminar un cliente**, para **remover registros que ya no aplican**.

**CA:**

1. Al presionar “Eliminar”, el registro deja de aparecer en la tabla.
2. Si el backend rechaza la acción, se informa el motivo.

#### HU-08 — Restricción de edición por rol

Como **empleado o cliente**, quiero **no ver opciones de creación/edición/eliminación**, para **evitar cambios no autorizados**.

**CA:**

1. Cuando el rol es `empleado` o `cliente`, el formulario se oculta.
2. Cuando el rol es `empleado` o `cliente`, los botones/columnas de editar/eliminar no se muestran.
3. Si el usuario intenta forzar la operación, la API responde con 403 si no tiene permisos.

### Requisitos funcionales: Departamentos

#### HU-09 — Gestionar departamentos

Como **usuario**, quiero **crear/consultar/editar/eliminar departamentos**, para **organizar la estructura de la empresa**.

**CA:**

1. Puedo ver un listado de departamentos.
2. Puedo crear un departamento con nombre y presupuesto (opcional).
3. Puedo editar un departamento existente.
4. Puedo eliminar un departamento.

### Requisitos funcionales: Proyectos

#### HU-10 — Gestionar proyectos

Como **usuario**, quiero **crear/consultar/editar/eliminar proyectos**, para **administrar iniciativas de la empresa**.

**CA:**

1. Puedo ver un listado de proyectos.
2. Puedo crear proyectos con nombre y presupuesto (opcional).
3. Puedo editar un proyecto.
4. Puedo eliminar un proyecto.

---

## 3) Requisitos Funcionales (RF)

### Autenticación / Autorización

- **RF-01 — Login:** El sistema debe permitir autenticación con email y contraseña. (`POST /auth/login`)
- **RF-02 — Token de sesión:** Al autenticarse, el backend debe retornar un token de acceso y el rol del usuario. (`/auth/login`)
- **RF-03 — Persistencia de sesión:** El frontend debe almacenar `token` y `rol` localmente para usarlos en las peticiones subsecuentes. (`public/auth.js`)
- **RF-04 — Protección de acceso:** Las pantallas protegidas deben redirigir al login si no existe `token`. (`public/script.js`)
- **RF-05 — Control de roles (backend):** El backend debe restringir acciones según rol consultado en tabla `usuarios`. (`src/middleware/auth.js` + rutas)

### Usuarios (admin)

- **RF-06 — Crear usuario:** Un admin debe poder crear usuarios y asignar rol. (`POST /auth/create-user`)
- **RF-07 — Listar usuarios (admin):** Un admin debe poder listar usuarios. (`GET /auth/users`)
- **RF-08 — Eliminar usuario (admin):** Un admin debe poder eliminar usuarios del sistema. (`DELETE /auth/users/:id`)

### Clientes (módulo principal en UI)

- **RF-09 — Listar clientes:** El sistema debe listar registros del módulo clientes. (`GET /employees`)
- **RF-10 — Consultar cliente por id:** El sistema debe permitir consultar un cliente por id. (`GET /employees/:id`)
- **RF-11 — Crear cliente:** El sistema debe permitir crear registros (según rol/permisos). (`POST /employees`)
- **RF-12 — Editar cliente:** El sistema debe permitir editar registros (según rol/permisos). (`PUT /employees/:id`)
- **RF-13 — Eliminar cliente:** El sistema debe permitir eliminar registros (según rol/permisos). (`DELETE /employees/:id`)

### Clientes (ruta alterna)

- **RF-14 — CRUD de clientes alterno:** El sistema debe exponer un CRUD para la tabla `clientes` con token y roles `admin`/`empleado`. (`/clientes`)

### Departamentos

- **RF-15 — Listar departamentos:** (`GET /departments`)
- **RF-16 — Consultar departamento:** (`GET /departments/:id`)
- **RF-17 — Crear departamento:** (`POST /departments`)
- **RF-18 — Editar departamento:** (`PUT /departments/:id`)
- **RF-19 — Eliminar departamento:** (`DELETE /departments/:id`)

### Proyectos

- **RF-20 — Listar proyectos:** (`GET /projects`)
- **RF-21 — Consultar proyecto:** (`GET /projects/:id`)
- **RF-22 — Crear proyecto:** (`POST /projects`)
- **RF-23 — Editar proyecto:** (`PUT /projects/:id`)
- **RF-24 — Eliminar proyecto:** (`DELETE /projects/:id`)

### UI / Navegación

- **RF-25 — Menú por rol:** El sistema debe mostrar opciones de navegación acorde al rol. (`public/menu.js`)
- **RF-26 — Feedback de errores:** El sistema debe mostrar mensajes de error en login y creación de usuario cuando el backend responda error. (`public/auth.js`, `public/admin.js`)

---

## 4) Requisitos No Funcionales (RNF)

### Seguridad

- **RNF-01 — Autenticación obligatoria:** Todo endpoint que exponga datos sensibles debe requerir token válido (Bearer). (Aplicar a `/employees`, `/clientes` y recomendación para `/projects` y `/departments`.)
- **RNF-02 — Autorización por rol:** Operaciones de administración (crear usuarios, borrar datos) deben estar restringidas por rol.
- **RNF-03 — Manejo seguro de secretos:** Las llaves `SUPABASE_URL` y `SUPABASE_KEY` deben estar en variables de entorno y nunca hardcodeadas.
- **RNF-04 — CORS controlado:** En despliegue se debe restringir origen con `CORS_ORIGINS` cuando aplique.

### Rendimiento

- **RNF-05 — Tiempo de respuesta:** Para operaciones de listado, el sistema debe responder en un tiempo razonable bajo carga normal (p.ej. < 2s en red estable).
- **RNF-06 — Paginación (mejora):** Si el volumen de datos crece, listados deberían paginar/filtrar para evitar tablas gigantes.

### Disponibilidad y confiabilidad

- **RNF-07 — Manejo de errores:** El backend debe responder con códigos HTTP adecuados (400/401/403/500) y mensajes claros.
- **RNF-08 — Tolerancia a fallas:** Ante fallas de Supabase, el sistema debe informar el error sin bloquear la UI.

### Usabilidad

- **RNF-09 — Mensajes claros:** El sistema debe mostrar mensajes de éxito/error en acciones críticas (login, crear usuario, CRUD).
- **RNF-10 — Validación básica:** Campos clave (email, nombre) deben validarse en frontend y backend.

### Compatibilidad

- **RNF-11 — Navegadores:** Compatible con navegadores modernos (Chrome/Edge/Firefox/Safari actuales).

### Mantenibilidad

- **RNF-12 — Separación por módulos:** Mantener rutas separadas por dominio (`employees`, `departments`, `projects`, `auth`).
- **RNF-13 — Configuración por entorno:** Permitir configuración por `.env` para local y producción.

---

## 5) Matriz rápida de trazabilidad (HU → RF)

- **HU-01** → RF-01, RF-02, RF-03
- **HU-02** → RF-04
- **HU-03** → RF-06
- **HU-04** → RF-09, RF-10
- **HU-05** → RF-11
- **HU-06** → RF-12
- **HU-07** → RF-13
- **HU-08** → RF-05, RF-25
- **HU-09** → RF-15 a RF-19
- **HU-10** → RF-20 a RF-24
