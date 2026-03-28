const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")

// verificar variables de entorno
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Error: Variables de entorno de Supabase no encontradas")
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// NOTA: ajusta el nombre de la tabla si en Supabase se llama distinto
const TABLE_NAME = process.env.SUPABASE_DEPARTMENTS_TABLE || "departments"

// GET todos los departamentos
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select("*")
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET departamento por id
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE departamento
router.post("/", async (req, res) => {
  try {
    const body = req.body || {}

    const { data, error } = await supabase.from(TABLE_NAME).insert([body])
    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// UPDATE departamento
router.put("/:id", async (req, res) => {
  try {
    const body = req.body || {}

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(body)
      .eq("id", req.params.id)

    if (error) throw error

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE departamento
router.delete("/:id", async (req, res) => {
  try {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", req.params.id)
    if (error) throw error

    res.json({ message: "Registro eliminado correctamente" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
