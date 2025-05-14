//* variables *//

let nombre = "Ana";   // puede cambiar
const edad = 25;      // constante
var ciudad = "Lima";  // forma antigua, se usa poco

//* tipos de datos *//

let texto = "Hola";      // string
let numero = 42;         // number
let activo = true;       // boolean
let lista = [1, 2, 3];   // array
let objeto = {nombre: "Ana", edad: 25}; // objeto

//* condicionales *//

let edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}

// Ternario
let mensaje = edad >= 18 ? "Adulto" : "Menor"; 

//* bucles *//

// For
for (let i = 0; i < 5; i++) {
    console.log(i);
}
  
// While
let x = 0;
while (x < 3) {
console.log(x);
x++;
}
  
// ForEach
let frutas = ["manzana", "pera", "uva"];
frutas.forEach(fruta => console.log(fruta));

//* funciones *//

function saludar(nombre) {
    console.log("Hola " + nombre);
  }
  
  const despedir = (nombre) => {
    console.log("Adiós " + nombre);
  }
  
  saludar("Ana");
  despedir("Juan");

//* objetos *//

let persona = {
    nombre: "Carlos",
    edad: 30,
    saludar: function() {
      console.log("Hola, soy " + this.nombre);
    }
  };
  
  console.log(persona.edad);
  persona.saludar();

//* eventos *//

<button id="miBoton">Haz clic</button>


  document.getElementById("miBoton").addEventListener("click", function() {
    alert("¡Botón presionado!");
  });

//* manipulacion del dom *//

<p id="resultado"></p>


  document.getElementById("resultado").textContent = "Texto cambiado";

//* formularios e inputs *//

<input id="nombre" type="text">
<button onclick="mostrar()">Mostrar</button>
<p id="saludo"></p>

  function mostrar() {
    let nombre = document.getElementById("nombre").value;
    document.getElementById("saludo").textContent = "Hola, " + nombre;
}

//* localstorage *//

localStorage.setItem("usuario", "Ana");
let usuario = localStorage.getItem("usuario");
localStorage.removeItem("usuario");

//* FETCH (peticiones HTTP) *//

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

//* funciones utiles *//

parseInt("5");         // convierte a número entero
parseFloat("5.4");     // convierte a decimal
toString();            // convierte a string
JSON.stringify(obj);   // objeto a texto JSON
JSON.parse(texto);     // texto JSON a objeto

//* bonus-funciones de tiempo *//

setTimeout(() => {
  console.log("Esto se ejecuta una vez después de 2 segundos");
}, 2000);

setInterval(() => {
  console.log("Esto se repite cada segundo");
}, 1000);



