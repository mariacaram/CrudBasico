let productos = [];

cargaInicial();

function cargaInicial(){

    productos = JSON.parse(localStorage.getItem("listaProductosKey")) || [];
    if (productos.length > 0 ){
productos.forEach((producto)=>{crearColumnas(producto)})
} else {


}}

function crearColumnas (producto){
let grilla = document.querySelector('#grilla');
grilla.innerHTML +=           `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">

<div class="card" >
  <img src="${producto.url}">
  <div class="card-body">
    <h5 class="card-title">${producto.nombreProducto}</h5>
    <p class="card-text">${producto.descripcion}</p>
  </div>

</div>
</div>`
}