require("dotenv").config()

const express = require("express")
const cors = require("cors")

const employeesRoutes = require("./src/routes/employees")
const departmentsRoutes = require("./src/routes/departments")
const authRoutes = require("./src/routes/auth")
const clientsRoutes = require("./src/routes/clientes")
const projectsRoutes = require("./src/routes/projects")

const app = express()

// CORS (Railway)
// Configura CORS_ORIGINS con una lista separada por coma.
// Ej: CORS_ORIGINS=https://tu-dominio.up.railway.app
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
  : null

app.use(
  cors(
    corsOrigins
      ? {
          origin: corsOrigins,
        }
      : {
          origin: true,
        }
  )
)
app.use(express.json())

app.use(express.static("public"))   // 👈 ESTA LÍNEA ES LA CLAVE

app.use("/employees", employeesRoutes)
app.use("/departments", departmentsRoutes)
app.use("/auth", authRoutes)
app.use("/clientes", clientsRoutes)
app.use("/projects", projectsRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})
