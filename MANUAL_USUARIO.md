# Manual de Usuario — Sistema de Gestión Empresarial (Parcial 1)

Este documento explica **cómo usar** la aplicación publicada en este repositorio: ingreso, navegación y uso de cada módulo.

---

## 1) ¿Qué es esta aplicación?

Es un sistema web para gestionar información empresarial con módulos de:

- **Clientes** (en el código también aparece como `employees`, pero la UI lo presenta como *Clientes*)
- **Departamentos**
- **Proyectos**
- **Usuarios** (solo para administradores)

El sistema tiene autenticación con **Supabase Auth** y control de permisos por **roles**.

---

## 2) Requisitos para usarla

### Opción A — Usar la demo (recomendada)

En el `README.md` del repo hay una URL desplegada en Railway. Entra desde un navegador moderno (Chrome/Edge/Firefox/Safari).

### Opción B — Usarla en local

Requisitos:

- Node.js 18+ (recomendado)

Pasos generales:

1. Instalar dependencias del proyecto.
2. Crear archivo `.env` con las variables de Supabase.
3. Iniciar el servidor.
4. Abrir el login en `http://localhost:3000/index.html`.

> Nota: el manual explica el uso funcional. Los detalles técnicos completos de instalación están en `README.md`.

---

## 3) Acceso al sistema (Login)

### 3.1 Pantalla de ingreso

1. Abre la página de inicio de sesión:

- `index.html`

1. Ingresa:

- **Correo**
- **Contraseña**

1. Presiona **Ingresar**.

Si las credenciales son correctas, el sistema:

- Guarda un **token** de sesión en el navegador.
- Guarda tu **rol**.
- Te redirige a **Gestión de Clientes** (`employees.html`).

### 3.2 Cerrar sesión

En las pantallas del sistema encontrarás **Cerrar sesión**.

Al cerrar sesión:

- Se borra la información (token/rol) guardada en el navegador.
- Vuelves al login.

---

## 4) Roles y permisos

La app maneja los roles:

- **admin** (Administrador)
- **empleado**
- **cliente** (se usa para restringir acciones sobre registros tipo cliente)

### 4.1 ¿Qué puede hacer cada rol?

#### Administrador (admin)

- Puede **ver** clientes.
- Puede **crear, editar y eliminar** clientes.
- Puede acceder al panel **Crear Usuario**.

#### Empleado (empleado)

- Puede **ver** la lista (clientes).
- Puede **crear/editar/eliminar** únicamente registros cuyo **tipo** sea `cliente` (esto aplica en la API).
- En la UI, se oculta el formulario y botones si el rol es empleado/cliente, pero la API tiene validaciones adicionales.

#### Cliente (cliente)

- Puede **ver** la lista.
- No debería poder crear/editar/eliminar (la UI deshabilita/oculta esas acciones).

> Importante: las restricciones finales se aplican en el backend mediante validación de token y rol.

---

## 5) Navegación del sistema

El menú se construye dinámicamente según tu rol:

- Si eres **admin** verás:
  - **Clientes**
  - **Crear Usuario**
  - **Cerrar Sesión**

- Si eres **empleado/cliente** verás:
  - **Clientes**
  - **Cerrar Sesión**

---

## 6) Módulo: Gestión de Clientes (`employees.html`)

### 6.1 ¿Qué permite hacer?

Este módulo sirve para gestionar la información de clientes. La pantalla presenta:

- Un formulario de registro (si tu rol lo permite)
- Una tabla con la lista de registros
- Botones de **Editar** y **Eliminar** (según rol)

### 6.2 Campos que puedes registrar

En el formulario se solicitan:

- **Nombre**
- **Apellido**
- **Email**
- **Edad** (opcional)
- **Teléfono** (opcional)
- **Salario** (opcional)
- **Fecha de nacimiento** (opcional)
- **Dirección** (opcional)
- **Activo** (true/false)

### 6.3 Crear un cliente

1. Completa los campos del formulario.
2. Presiona **Guardar**.
3. Verifica en la tabla que el registro aparece.

### 6.4 Editar un cliente

1. En la tabla, presiona **Editar** en el registro que quieres modificar.
2. El formulario se cargará con los datos actuales.
3. Ajusta los campos.
4. Presiona **Guardar**.

### 6.5 Eliminar un cliente

1. En la tabla, presiona **Eliminar**.
2. El registro desaparecerá de la lista.

### 6.6 Limpiar formulario

- Presiona **Limpiar** para resetear el formulario sin guardar.

### 6.7 Restricciones por rol en la pantalla

- Para **empleado** y **cliente** la pantalla oculta:
  - El formulario de creación/edición
  - Las columnas/botones de editar y eliminar

---

## 7) Módulo: Departamentos (`departments.html`)

### 7.1 ¿Qué permite hacer?

- Crear departamentos
- Listar departamentos
- Editar departamentos
- Eliminar departamentos

### 7.2 Campos

- **Nombre del departamento** (obligatorio)
- **Presupuesto** (opcional)

### 7.3 Crear

1. Escribe el nombre (y presupuesto si aplica).
2. Presiona **Guardar**.

### 7.4 Editar

1. En la tabla, presiona **Editar**.
2. Se cargan los campos en el formulario.
3. Cambia los valores.
4. Presiona **Guardar**.

### 7.5 Eliminar

1. En la tabla, presiona **Eliminar**.

---

## 8) Módulo: Proyectos (`projects.html`)

### 8.1 ¿Qué permite hacer?

- Crear proyectos
- Listar proyectos
- Editar proyectos
- Eliminar proyectos

### 8.2 Campos

- **Nombre del proyecto** (obligatorio)
- **Presupuesto** (opcional)

### 8.3 Crear / Editar / Eliminar

Funciona igual que Departamentos:

- **Guardar** crea o actualiza
- **Editar** carga el formulario
- **Eliminar** borra el registro

---

## 9) Módulo: Administración — Crear Usuario (`admin.html`) (solo admin)

### 9.1 ¿Para qué sirve?

Permite a un administrador crear usuarios nuevos en el sistema (Supabase Auth) y asignarles rol.

### 9.2 Datos a ingresar

- **Email**
- **Contraseña**
- **Rol**: `empleado` o `admin`

### 9.3 Crear usuario

1. Entra a **Crear Usuario** desde el menú.
2. Completa email y contraseña.
3. Selecciona el rol.
4. Presiona **Crear Usuario**.

Si todo sale bien, verás el mensaje: **"Usuario creado correctamente"**.

---

## 10) Mensajes y problemas comunes (FAQ)

### “No autorizado” / “Token inválido”

- Tu sesión expiró o no estás logueado.
- Solución: **cierra sesión** y vuelve a ingresar.

### No veo el formulario ni los botones de editar/eliminar

- Tu rol es **empleado** o **cliente**.
- Es el comportamiento esperado por permisos.

### “Acceso denegado” al crear usuario

- Solo el rol **admin** puede crear usuarios.

### Error al cargar proyectos/departamentos

- Puede ser un problema de conexión con Supabase o que falten variables `.env` en local.

---

## 11) Referencias rápidas (URLs internas)

- Login: `index.html`
- Clientes: `employees.html`
- Departamentos: `departments.html`
- Proyectos: `projects.html`
- Admin (crear usuario): `admin.html`

---

## 12) Glosario

- **Token**: credencial temporal que permite consumir la API.
- **Rol**: perfil de permisos del usuario (admin/empleado/cliente).
- **CRUD**: Crear (Create), Consultar (Read), Actualizar (Update), Eliminar (Delete).
