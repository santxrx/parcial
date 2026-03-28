const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// ✅ Verificar token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "No autorizado" })
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error) {
    return res.status(401).json({ error: "Token inválido" })
  }

  req.user = data.user
  next()
}

// ✅ Verificar rol
const verifyRole = (rolPermitido) => {
  return async (req, res, next) => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", req.user.id)
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    if (data.rol !== rolPermitido) {
      return res.status(403).json({ error: "Acceso denegado" })
    }

    next()
  }
}

module.exports = { verifyToken, verifyRole }