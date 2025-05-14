function buscarProductos() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        let nombre = producto.getAttribute("data-nombre").toLowerCase();
        producto.style.display = nombre.includes(input) ? "block" : "none";
    });
}
