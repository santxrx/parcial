const express = require("express")
const router = express.Router()
const { verifyToken, verifyRoles } = require("../middleware/auth")
const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// 📖 TODOS pueden ver
router.get("/", verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase.from("crud").select("*")
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("crud")
      .select("*")
      .eq("id", req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔥 CREATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id

    // obtener rol del usuario
    const { data: userData } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", userId)
      .single()

    const rol = userData.rol

    // 👉 ADMIN puede todo
    if (rol === "admin") {
      const { data, error } = await supabase.from("crud").insert([req.body])
      if (error) throw error
      return res.json(data)
    }

    // 👉 EMPLEADO solo si es cliente
    if (rol === "empleado" && req.body.tipo === "cliente") {
      const { data, error } = await supabase.from("crud").insert([req.body])
      if (error) throw error
      return res.json(data)
    }

    return res.status(403).json({ error: "No tienes permiso" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔥 UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id

    // rol del usuario
    const { data: userData } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", userId)
      .single()

    const rol = userData.rol

    // registro a modificar
    const { data: registro } = await supabase
      .from("crud")
      .select("*")
      .eq("id", req.params.id)
      .single()

    // 👉 ADMIN puede todo
    if (rol === "admin") {
      const { data, error } = await supabase
        .from("crud")
        .update(req.body)
        .eq("id", req.params.id)

      if (error) throw error
      return res.json(data)
    }

    // 👉 EMPLEADO solo si es cliente
    if (rol === "empleado" && registro.tipo === "cliente") {
      const { data, error } = await supabase
        .from("crud")
        .update(req.body)
        .eq("id", req.params.id)

      if (error) throw error
      return res.json(data)
    }

    return res.status(403).json({ error: "No tienes permiso" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔥 DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id

    const { data: userData, error: errorUser } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", userId)
      .single()

    if (errorUser) throw errorUser

    const rol = userData.rol

    const { data: registro, error: errorRegistro } = await supabase
      .from("crud")
      .select("*")
      .eq("id", req.params.id)
      .single()

    if (errorRegistro) throw errorRegistro

    if (rol === "admin") {
      const { error } = await supabase
        .from("crud")
        .delete()
        .eq("id", req.params.id)

      if (error) throw error

      return res.json({ message: "Eliminado" })
    }

    if (rol === "empleado" && registro.tipo === "cliente") {
      const { error } = await supabase
        .from("crud")
        .delete()
        .eq("id", req.params.id)

      if (error) throw error

      return res.json({ message: "Eliminado" })
    }

    return res.status(403).json({ error: "No tienes permiso" })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

module.exports = router