import {
  validarCampoRequerido,
  validarCodigo,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";
//declaracion de variables

let producto = document.querySelector("#producto");
let cantidad = document.querySelector("#cantidad");
let codigo = document.querySelector("#codigo");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let formulario = document.querySelector("#formProducto");
let listaProductos = [];
// agregar eventos desde javascript
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
formulario.addEventListener("submit", guardarProducto);

// Verifico si hay datos en el local Storage
cargaInicial();

function guardarProducto(e) {
  e.preventDefault();
  if (validarGeneral()) {
    agregarProducto();
    console.log("aqui debería crear un prodcuto");
  } else {
    console.log("aqui debería mostrar un error");
  }
}

function agregarProducto() {
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  console.log(productoNuevo);

  listaProductos.push(productoNuevo);
  console.log(listaProductos);

  // guardar en el local Storage:

  localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));
  //dibujar en la tabla

  crearFila(productoNuevo);
  limpiarFormulario();
}
// Si hay algo en el local lo guardo en el arreglo, sino, dejo el array vacio
function cargaInicial() {
  listaProductos = JSON.parse(localStorage.getItem("listaProductosKey")) || [];
  //Llamar a la funcion que crea filas
  listaProductos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}

function crearFila(itemProducto) {
  let tabla = document.querySelector("#tablaProductos");
  console.log(tabla);
  tabla.innerHTML += `  <tr>
<th scope="row">${itemProducto.codigo}</th>
<td>${itemProducto.descripcion}</td>
<td>${itemProducto.cantidad}</td>
<td>${itemProducto.cantidad}</td>
<td>${itemProducto.url}</td>
<td>
    <button class="btn btn-warning" >Editar</button>
    <button class="btn btn-danger" >Borrar</button>
</td>
`;
}

function limpiarFormulario() {
  formulario.reset();

  codigo.className = "form-control";
  producto.className = "form-control";
  descripcion.className = "form-control";
  cantidad.className = "form-control";
  url.className = "form-control";
}
