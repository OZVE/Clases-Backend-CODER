//Ejercicios clase 1 coderhouse

var numero1 = 5;
var numero2 = 8;

if (numero1 > numero2){
    console.log(`numero ${numero1} es mayor que ${numero2}`);
}else{
    console.log(`numero ${numero1} no es mayor que ${numero2}`);
}
if (numero2 > 0){
    console.log(`numero ${numero2} es positivo`);
}else{
    console.log(`numero ${numero2} es negativo`);
}
if (numero1 < 0 || numero1 != 0){

    console.log(`numero ${numero1} es negativo o distinto de cero`);
}else{
    console.log(`numero ${numero1} es positivo o igual a cero`);
}
if (numero1 < numero2){
    console.log(`Incrementar en 1 unidad el valor de ${numero1++} no lo hace mayor o igual que ${numero2}`);
    console.log(numero1)
}else{
    console.log(`Incrementar en 1 unidad el valor de ${numero1} lo hacer mayor o igual que ${numero2}`);
}
