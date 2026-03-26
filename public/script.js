const API_URL = "http://localhost:3000/employees";

const form = document.getElementById("employeeForm");
const table = document.querySelector("#employeesTable tbody");

let editingId = null;


// Cargar empleados al iniciar
document.addEventListener("DOMContentLoaded", loadEmployees);


async function loadEmployees() {

const response = await fetch(API_URL);
const employees = await response.json();

table.innerHTML = "";

employees.forEach(emp => {

const row = document.createElement("tr");


row.innerHTML = `
<td>${emp.id}</td>
<td>${emp.nombre}</td>
<td>${emp.apellido}</td>
<td>${emp.email}</td>
<td>${emp.edad}</td>
<td>${emp.telefono}</td>
<td>${emp.activo}</td>
<td>${emp.salario}</td>
<td>${emp.fecha_nacimiento}</td>
<td>${emp.direccion || ""}</td>

<td>
<button class="edit" data-id="${emp.id}">Editar</button>
</td>

<td>
<button class="delete" data-id="${emp.id}">Eliminar</button>
</td>
`;

table.appendChild(row);

});

}



// Crear o editar empleado
form.addEventListener("submit", async function(e){

e.preventDefault();

const data = Object.fromEntries(new FormData(form));

if(editingId){

await fetch(`${API_URL}/${editingId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

editingId = null;

}else{

await fetch(API_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

}

form.reset();
loadEmployees();

});



// Botones editar y eliminar
table.addEventListener("click", async function(e){

const id = e.target.dataset.id;

if(e.target.classList.contains("delete")){

await fetch(`${API_URL}/${id}`,{
method:"DELETE"
});

loadEmployees();

}


if(e.target.classList.contains("edit")){

const response = await fetch(`${API_URL}/${id}`);
const employee = await response.json();

form.nombre.value = employee.nombre;
form.apellido.value = employee.apellido;
form.email.value = employee.email;
form.edad.value = employee.edad;
form.telefono.value = employee.telefono;
form.activo.value = employee.activo;
form.salario.value = employee.salario;
form.fecha_nacimiento.value = employee.fecha_nacimiento;

editingId = id;

window.scrollTo(0,0);

}

});

const clearBtn = document.getElementById("clearForm");
clearBtn.addEventListener("click", function() {
    form.reset();
    editingId = null;
});