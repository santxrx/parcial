const API_URL = "/departments"

const form = document.getElementById("departmentForm")
const table = document.querySelector("#departmentsTable tbody")

let editingId = null

document.addEventListener("DOMContentLoaded", loadDepartments)

async function loadDepartments() {
  const response = await fetch(API_URL)
  const departments = await response.json()

  table.innerHTML = ""

  departments.forEach((dep) => {
    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${dep.id}</td>
      <td>${dep.nombre ?? ""}</td>
      <td>${dep.presupuesto ?? ""}</td>
      <td><button class="edit" data-id="${dep.id}">Editar</button></td>
      <td><button class="delete" data-id="${dep.id}">Eliminar</button></td>
    `

    table.appendChild(row)
  })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const data = Object.fromEntries(new FormData(form))

  if (data.presupuesto === "") {
    data.presupuesto = null
  } else if (data.presupuesto != null) {
    const n = Number(data.presupuesto)
    data.presupuesto = Number.isFinite(n) ? n : null
  }

  if (editingId) {
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    editingId = null
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  form.reset()
  loadDepartments()
})

table.addEventListener("click", async (e) => {
  const id = e.target.dataset.id
  if (!id) return

  if (e.target.classList.contains("delete")) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    loadDepartments()
  }

  if (e.target.classList.contains("edit")) {
    const response = await fetch(`${API_URL}/${id}`)
    const department = await response.json()

    form.nombre.value = department.nombre ?? ""
  form.presupuesto.value = department.presupuesto ?? ""

    editingId = id
    window.scrollTo(0, 0)
  }
})

document.getElementById("clearForm").addEventListener("click", () => {
  form.reset()
  editingId = null
})
