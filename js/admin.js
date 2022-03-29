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
let productoExistente = false //Si es false, significa que no existe el producto entonces tengo que agregar uno nuevo. Pero si es true, tengo que modificar. 
// agregar eventos desde javascript
let btnAgregar = document.querySelector("#btnAgregar")
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
btnAgregar.addEventListener("click", limpiarFormulario);

// Verifico si hay datos en el local Storage
cargaInicial();

function guardarProducto(e) {
  e.preventDefault();
  //funcion para validar datos del formulario
  if (validarGeneral()) {
    //verifico si existe el objeto
    if (productoExistente)
         { // modificar
          actualizarProducto()} 
           else
           //agregar
              {agregarProducto()}}
  else {console.log("aqui debería mostrar un error");}
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
  // console.log(tabla);
  tabla.innerHTML += `  <tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombreProducto}</td>
<td>${itemProducto.descripcion}</td>
<td>${itemProducto.cantidad}</td>
<td>${itemProducto.url}</td>
<td>
    <button class="btn btn-warning" onclick="prepararEdicionProducto(
    ${itemProducto.codigo})">Editar</button>
    <button class="btn btn-danger" >Borrar</button>
</td>
</tr>
`;
}

function limpiarFormulario() {
  formulario.reset();

  codigo.className = "form-control";
  producto.className = "form-control";
  descripcion.className = "form-control";
  cantidad.className = "form-control";
  url.className = "form-control";

  productoExistente = false
}

window.prepararEdicionProducto = (codigo) => {
  let productoEncontrado = listaProductos.find ((itemProducto) =>  {return itemProducto.codigo == codigo});
  console.log (productoEncontrado)
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#producto").value = productoEncontrado.nombreProducto;
  document.querySelector("#descripcion").value = productoEncontrado.descripcion;
  document.querySelector("#cantidad").value = productoEncontrado.cantidad;
  document.querySelector("#url").value = productoEncontrado.url;

  productoExistente = true;



} 

function actualizarProducto () 
{

  let indiceProducto = listaProductos.findIndex ( (itemProducto)=> {return itemProducto.codigo == codigo.value}  )

listaProductos[indiceProducto].nombreProducto = producto.value 
listaProductos[indiceProducto].descripcion = descripcion.value 
listaProductos[indiceProducto].cantidad = cantidad.value 
listaProductos[indiceProducto].url = url.value 
console.log(listaProductos[indiceProducto])
borrarFilas ()
listaProductos.forEach ((itemProducto)=>{crearFila (itemProducto)})
localStorage.setItem("listaProductosKey", JSON.stringify(listaProductos));

 }


function borrarFilas (){
  let tabla = document.querySelector("#tablaProductos")
tabla.innerHTML = "";

}


