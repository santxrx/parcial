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
  const { data } = await supabase.from("clientes").select("*")
  res.json(data)
})

router.get("/:id", verifyToken, async (req, res) => {
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", req.params.id)
    .single()

  res.json(data)
})

// 👑 ADMIN + EMPLEADO

router.post("/", verifyToken, verifyRoles(["admin", "empleado"]), async (req, res) => {
  const { data } = await supabase.from("clientes").insert([req.body])
  res.json(data)
})

router.put("/:id", verifyToken, verifyRoles(["admin", "empleado"]), async (req, res) => {
  const { data } = await supabase
    .from("clientes")
    .update(req.body)
    .eq("id", req.params.id)

  res.json(data)
})

router.delete("/:id", verifyToken, verifyRoles(["admin", "empleado"]), async (req, res) => {
  await supabase.from("clientes").delete().eq("id", req.params.id)
  res.json({ message: "Eliminado" })
})

module.exports = router