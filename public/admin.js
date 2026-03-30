const API_URL = "/auth/create-user";

const form = document.getElementById("createUserForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rol = document.getElementById("rol").value;

  // 🔐 traer token guardado del login
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 👈 IMPORTANTE
      },
      body: JSON.stringify({ email, password, rol })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = "green";
      message.textContent = "Usuario creado correctamente ✅";
      form.reset();
    } else {
      message.style.color = "red";
      message.textContent = data.error || "Error al crear usuario ❌";
    }

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Error de conexión ❌";
  }
});