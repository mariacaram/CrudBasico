function validarCampoRequerido(input){
console.log (input.value)
    if (input.value.trim().length >0 && input.value.trim().length >=3){
    console.log ("El dato es correcto")
input.className= "form-control is-valid"
} else {
input.className= "form-control is-invalid"
        console.log ("El dato es incorrecto")}
    
    }

    
    function validarNumeros (input) {
    let patron = /^[0-9]{1,5}$/
    if (patron.test (input.value)){
input.className= "form-control is-valid"

    } else {

        input.className= "form-control is-invalid"

    }


}

    let producto = document.querySelector("#producto")
producto.addEventListener ("blur", ()=>{validarCampoRequerido(producto)})

let cantidad = document.querySelector("#cantidad");

cantidad.addEventListener ("blur", ()=>{validarNumeros(cantidad)})

