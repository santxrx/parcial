const express = require("express")
const router = express.Router()
const { createClient } = require("@supabase/supabase-js")

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Error: Variables de entorno de Supabase no encontradas")
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

const TABLE_NAME = process.env.SUPABASE_PROJECTS_TABLE || "projects"

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from(TABLE_NAME).select("*")
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

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
