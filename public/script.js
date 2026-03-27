const API_URL = "http://localhost:3000/employees";

const form = document.getElementById("employeeForm");
const table = document.querySelector("#employeesTable tbody");

let editingId = null;

// Obtener token y rol
const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");

// Proteger acceso
if (!token) {
  window.location.href = "index.html";
}

// Cargar empleados al iniciar
document.addEventListener("DOMContentLoaded", loadEmployees);


// CARGAR EMPLEADOS
async function loadEmployees() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const employees = await response.json();

    table.innerHTML = "";

    employees.forEach(emp => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.nombre}</td>
        <td>${emp.apellido}</td>
        <td>${emp.email}</td>
        <td>${emp.edad}</td>
        <td>${emp.telefono}</td>
        <td>${emp.activo}</td>
        <td>${emp.salario}</td>
        <td>${emp.fecha_nacimiento}</td>
        <td>${emp.direccion || ""}</td>

        <td>
          <button class="edit" data-id="${emp.id}">Editar</button>
        </td>

        <td>
          <button class="delete" data-id="${emp.id}">Eliminar</button>
        </td>
      `;

      table.appendChild(row);
    });

    // Control de rol (ocultar botones si no es admin)
    if (rol !== "admin") {
      document.querySelectorAll(".delete").forEach(btn => btn.style.display = "none");
      document.querySelectorAll(".edit").forEach(btn => btn.style.display = "none");
      document.querySelector("button[type='submit']").style.display = "none";
    }

  } catch (error) {
    console.error(error);
  }
}


// CREAR o EDITAR
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  try {
    if (editingId) {

      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
      });

      editingId = null;

    } else {

      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)
      });

    }

    form.reset();
    loadEmployees();

  } catch (error) {
    console.error(error);
  }
});


// BOTONES EDITAR / ELIMINAR
table.addEventListener("click", async function (e) {

  const id = e.target.dataset.id;

  try {

    // ELIMINAR
    if (e.target.classList.contains("delete")) {

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      loadEmployees();
    }

    // EDITAR
    if (e.target.classList.contains("edit")) {

      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const employee = await response.json();

      form.nombre.value = employee.nombre;
      form.apellido.value = employee.apellido;
      form.email.value = employee.email;
      form.edad.value = employee.edad;
      form.telefono.value = employee.telefono;
      form.activo.value = employee.activo;
      form.salario.value = employee.salario;
      form.fecha_nacimiento.value = employee.fecha_nacimiento;
      form.direccion.value = employee.direccion || "";

      editingId = id;

      window.scrollTo(0, 0);
    }

  } catch (error) {
    console.error(error);
  }
});


// LIMPIAR FORMULARIO
const clearBtn = document.getElementById("clearForm");
clearBtn.addEventListener("click", function () {
  form.reset();
  editingId = null;
});
