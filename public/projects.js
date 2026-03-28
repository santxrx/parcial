const API_URL = "http://localhost:3000/projects"

const form = document.getElementById("projectForm")
const table = document.querySelector("#projectsTable tbody")

let editingId = null

document.addEventListener("DOMContentLoaded", loadProjects)

async function loadProjects() {
  const response = await fetch(API_URL)
  const projects = await response.json()

  if (!response.ok || (projects && projects.error)) {
    const msg = projects?.error || `Error HTTP ${response.status}`
    table.innerHTML = `<tr><td colspan="5" style="color:#c93030; font-weight:600;">${msg}</td></tr>`
    return
  }

  table.innerHTML = ""

  projects.forEach((p) => {
    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre ?? ""}</td>
      <td>${p.presupuesto ?? ""}</td>
      <td><button class="edit" data-id="${p.id}">Editar</button></td>
      <td><button class="delete" data-id="${p.id}">Eliminar</button></td>
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
  loadProjects()
})

table.addEventListener("click", async (e) => {
  const id = e.target.dataset.id
  if (!id) return

  if (e.target.classList.contains("delete")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    loadProjects()
  }

  if (e.target.classList.contains("edit")) {
    const response = await fetch(`${API_URL}/${id}`)
    const project = await response.json()

    form.nombre.value = project.nombre ?? ""
    form.presupuesto.value = project.presupuesto ?? ""

    editingId = id
    window.scrollTo(0, 0)
  }
})

document.getElementById("clearForm").addEventListener("click", () => {
  form.reset()
  editingId = null
})
