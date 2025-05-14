document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    mostrarCarrito();
});

// Obtener carrito de LocalStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito en LocalStorage
function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    console.log("Intentando agregar:", nombre, precio); // 📌 Prueba

    if (!nombre || !precio) {
        alert("Error: Producto sin datos.");
        return;
    }

    let carrito = obtenerCarrito(); // Obtener carrito actualizado
    carrito.push({ nombre, precio: parseFloat(precio) });

    actualizarCarrito(carrito); // Guardar en LocalStorage
    actualizarContadorCarrito();
    mostrarCarrito(); // Mostrar actualización en tiempo real
    
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        let carrito = obtenerCarrito();
        contador.textContent = carrito.length;
    }
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (!listaCarrito || !totalElemento) {
        console.warn("No se encontró el contenedor del carrito."); // 📌 Prueba
        return;
    }

    let carrito = obtenerCarrito();
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}`;

        // Botón eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => {
            carrito.splice(index, 1);
            actualizarCarrito(carrito);
            mostrarCarrito();
            actualizarContadorCarrito();
        };

        item.appendChild(botonEliminar);
        listaCarrito.appendChild(item);
        total += producto.precio;
    });

    totalElemento.textContent = `${total.toFixed(2)}`;
}

// Evento para vaciar el carrito
document.addEventListener("DOMContentLoaded", () => {
    const btnVaciar = document.getElementById("vaciar-carrito");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            actualizarCarrito([]); // Vaciar LocalStorage
            mostrarCarrito();
            actualizarContadorCarrito();
        });
    }
});

// Evento para agregar productos desde la tienda
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".agregar-carrito").forEach((boton) => {
        // 🔥 Primero, eliminamos posibles eventos duplicados
        boton.removeEventListener("click", agregarEventoAlBoton);
        
        // 🔥 Luego, asignamos el evento correctamente
        boton.addEventListener("click", agregarEventoAlBoton);
    });
});

// Función que maneja la adición al carrito
function agregarEventoAlBoton(event) {
    const boton = event.target;
    const nombre = boton.dataset.nombre;
    const precio = boton.dataset.precio;

    if (!nombre || !precio) {
        alert("Error: El producto no tiene datos.");
        return;
    }

    agregarAlCarrito(nombre, precio);
    cambiarBotonAñadido(boton);
}

// Función para cambiar el texto del botón cuando se agrega un producto
function cambiarBotonAñadido(boton) {
    boton.textContent = "Producto añadido";
    boton.disabled = true;
    boton.style.backgroundColor = "#28a745"; // Verde
    boton.style.color = "#fff"; // Blanco
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = carrito.reduce((suma, producto) => {
      let precio = parseFloat(producto.precio) || 0.00;
      let cantidad = parseInt(producto.cantidad) || 1;
      return suma + (precio * cantidad);
    }, 0.00);
    return total.toFixed(2);
}
   
// Funcion buscador de productos en el encabezado //

function buscarProductos() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let nombre = producto.getAttribute("data-nombre").toLowerCase();
        producto.style.display = nombre.includes(input) ? "block" : "none";
    });
}

// Funcion buscador de productos en la seccion productos //

function buscarProductos2() {
    let input = document.getElementById("buscador2").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let nombre = producto.getAttribute("data-nombre").toLowerCase();
        producto.style.display = nombre.includes(input) ? "block" : "none";
    });
}

/* funcion para enviar el pedido por whatsapp */

document.getElementById("btn-whatsapp").addEventListener("click", function () {
    const productos = document.querySelectorAll("#lista-carrito .producto");
    if (productos.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    let mensaje = "¡Hola! Quiero hacer este pedido:%0A";
    let total = 0;
  
    productos.forEach(item => {
      const nombre = item.dataset.nombre || item.textContent.trim();
      const cantidad = item.dataset.cantidad || 1;
      const precio = parseFloat(item.dataset.precio) || 0;
      const subtotal = cantidad * precio;
      total += subtotal;
  
      mensaje += `- ${nombre} x${cantidad} = $${subtotal.toFixed(2)}%0A`;
    });
  
    mensaje += `%0ATotal a pagar: $${total.toFixed(2)}`;
  
    const numeroWhatsApp = "+51913541033";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, "_blank");
  });
  
  const SUPABASE_URL = "https://lfrclbqmvkdyamtqevvo.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmNsYnFtdmtkeWFtdHFldnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDY3OTksImV4cCI6MjA2MjcyMjc5OX0.uAkqSKAFKiVHUfH1QyCoLqPa3fygFh4n3wO4CdjP59Q";

  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function cargarProductos() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  const contenedor = document.getElementById('productos');
  data.forEach(p => {
    contenedor.innerHTML += `
      <div>
        <img src="${p.image_url}" width="150">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <strong>$${p.price}</strong>
      </div>
    `;
  });
}

cargarProductos();

async function registrar() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass
  });

  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('Revisa tu correo para confirmar');
  }
}

  