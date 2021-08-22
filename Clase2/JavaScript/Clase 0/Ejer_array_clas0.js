//EJERCICIOS CLASE 1. CODERHOUSE

// Apartir del siguiente array que se proporciona var valores = [true, 5, false,"hola","adios",2];

var arr = [true, 5, false, "hola", "adios", 2];

function devolverTextoMasLargo(array) {
    let c = '';
    for (item in array)
   {
       if(array[item].length > c.length )
       c = array[item];
   }
   return c;    
}
console.log(devolverTextoMasLargo(arr));

arr.forEach((valor, i) => {
    if (valor == false){
        console.log(`encontrado en el indice ${i}`)
    }
})
var arr = [true, 5, false, "hola", "adios", 2];

function resolverOperacion(valores, operacion){
    let numeros = []
    valores.filter(element => {if(typeof element == "number") numeros.push(element)})
if(operacion == 'suma'){
    return numeros[0] + numeros[1]
}else if(operacion =='resta'){
    return numeros[0] - numeros[1]
}else if(operacion == 'multiplicacion'){
    return numeros[0] * numeros[1]
}else if(operacion == 'division'){
    return numeros[0] / numeros[1]
}else
return 'not valid';
};
console.log(resolverOperacion(arr, 'division'));





