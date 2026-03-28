require("dotenv").config()

const express = require("express")
const cors = require("cors")

const employeesRoutes = require("./src/routes/employees")
const departmentsRoutes = require("./src/routes/departments")
const authRoutes = require("./src/routes/auth")
const clientsRoutes = require("./src/routes/clients")

const projectsRoutes = require("./src/routes/projects")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))   // 👈 ESTA LÍNEA ES LA CLAVE

app.use("/employees", employeesRoutes)
app.use("/departments", departmentsRoutes)
app.use("/auth", authRoutes)
app.use("/clients", clientsRoutes)
app.use("/projects", projectsRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})
