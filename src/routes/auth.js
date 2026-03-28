const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")
const { verifyToken, verifyRoles } = require("../middleware/auth")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// 👑 ADMIN CREA USUARIOS
router.post("/create-user", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  const { email, password, rol } = req.body

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error

    const { error: errorInsert } = await supabase
      .from("usuarios")
      .insert([{
        id: data.user.id,
        email,
        rol
      }])

    if (errorInsert) throw errorInsert

    res.json({ message: "Usuario creado por admin" })

  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 📝 REGISTER
router.post("/register", async (req, res) => {
  const { email, password, rol } = req.body

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error

    const { error: errorInsert } = await supabase
      .from("usuarios")
      .insert([{
        id: data.user.id,
        email,
        rol: rol || "empleado"
      }])

    if (errorInsert) throw errorInsert

    res.json({ message: "Usuario registrado correctamente" })

  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    const { data: userData } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", data.user.id)
      .single()

    if (!userData) {
      return res.status(404).json({ error: "Usuario sin rol asignado" })
    }

    res.json({
      message: "Login exitoso",
      token: data.session.access_token,
      user: data.user,
      rol: userData.rol
    })

  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

// 👑 SOLO ADMIN VE USUARIOS
router.get("/users", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  const { data, error } = await supabase.from("usuarios").select("*")
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

// 👑 SOLO ADMIN ELIMINA USUARIOS
router.delete("/users/:id", verifyToken, verifyRoles(["admin"]), async (req, res) => {
  const { id } = req.params

  try {
    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id)

    if (error) throw error

    res.json({ message: "Usuario eliminado del sistema" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router