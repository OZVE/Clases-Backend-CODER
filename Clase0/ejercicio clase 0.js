
 var arr = [true,false,'hola','adios',5];

 function devolverTextoMasLargo(array) {
     let c = '';
     for (item in array)
    {
        if(array[item].length > c.length )
        c = array[item];
    }
    return c;    
}

console.log(
    devolverTextoMasLargo(arr)
)