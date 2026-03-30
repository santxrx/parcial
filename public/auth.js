const API_AUTH = "/auth";

// 🔐 LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);

      // 🔄 redirigir
      window.location.href = "employees.html";

    } else {
      document.getElementById("mensaje").innerText = data.error;
    }

  } catch (error) {
    console.error(error);
  }
}


// 🚪 LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}