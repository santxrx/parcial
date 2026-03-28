const express = require("express")
const router = express.Router()
const { verifyToken, verifyRole } = require("../middleware/auth")
const { createClient } = require("@supabase/supabase-js")

// verificar variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Error: Variables de entorno de Supabase no encontradas")
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// GET todos los registros
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("crud")
      .select("*")

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET registro por id
router.get("/:id", async (req, res) => {
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

// CREATE registro
router.post("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("crud")
      .insert([req.body])

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// UPDATE registro
router.put("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("crud")
      .update(req.body)
      .eq("id", req.params.id)

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE registro
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase
      .from("crud")
      .delete()
      .eq("id", req.params.id)

    if (error) throw error

    res.json({ message: "Registro eliminado correctamente" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})



module.exports = router