// Contraseña de acceso simple (no segura)
const clave = prompt("Introduce la contraseña de administrador:");
if (clave !== "gatosecreto123") {
  alert("Acceso denegado");
  window.location.href = "index.html";
}

// Agregar producto
document.getElementById("form-producto").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const imagen = document.getElementById("imagen").value;

  const producto = { nombre, precio, imagen };
  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));

  mostrarProductos();
  this.reset();
});

// Mostrar productos
function mostrarProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const lista = document.getElementById("lista-productos-admin");
  lista.innerHTML = "";

  productos.forEach((prod, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${prod.nombre} - $${prod.precio}
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Eliminar producto
function eliminarProducto(index) {
  let productos = JSON.parse(localStorage.getItem("productos"));
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

mostrarProductos();

/* catalogo de productos admin */

const contenedor = document.getElementById("catalogo");
const productos = JSON.parse(localStorage.getItem("productos")) || [];
productos.forEach(p => {
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${p.imagen}" width="100"><br>
    <strong>${p.nombre}</strong><br>
    <span>$${p.precio}</span><br><br>
  `;
  contenedor.appendChild(div);
});

const adminForm = document.getElementById("adminForm");

adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const fileInput = document.getElementById("productImageFile");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    const imageUrl = data.imageUrl;

    const product = {
      name,
      price,
      image: imageUrl,
    };

    // Aquí guardarías el producto como antes
    // por ejemplo en localStorage o enviándolo al backend
    console.log(product);

    adminForm.reset();
  } catch (error) {
    console.error("Error al subir imagen:", error);
  }
});
