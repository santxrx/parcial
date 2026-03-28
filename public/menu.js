// 🔐 Obtener rol
const rol = localStorage.getItem("rol");

// 🚫 Si no hay sesión → login
if (!rol) {
  window.location.href = "index.html";
}

// 🎨 Crear menú dinámico
function crearMenu() {
  const nav = document.createElement("nav");
  nav.classList.add("menu");

  // 👑 SOLO ADMIN ve menú completo
  if (rol === "admin") {
    nav.innerHTML = `
      <button onclick="irClientes()">Clientes</button>
      <button onclick="irUsuarios()">Crear Usuario</button>
      <button onclick="logout()">Cerrar Sesión</button>
    `;
  } else {
    // 👨‍💼 EMPLEADO / 👤 CLIENTE
    nav.innerHTML = `
      <button onclick="irClientes()">Clientes</button>
      <button onclick="logout()">Cerrar Sesión</button>
    `;
  }

  document.body.prepend(nav);
}

// 🚀 Funciones globales
function irClientes() {
  window.location.href = "employees.html";
}

function irUsuarios() {
  window.location.href = "admin.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// 🚀 Inicializar menú
document.addEventListener("DOMContentLoaded", crearMenu);