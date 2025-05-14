function calcularTotalCarrito() {
    let carrito = obtenerCarrito();
    let total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
        let precio = parseFloat(producto.precio) || 0; // Asegura que sea un número
        let cantidad = parseInt(producto.cantidad) || 1; // Asegura que la cantidad sea un número
        return total.toFixed(2); // Redondea a 2 decimales
}

// Funcion agregar al carrito //

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
    alert(`${nombre} agregado al carrito.`);
}