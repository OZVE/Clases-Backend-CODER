// export default function Suma(num1: number, num2: number,){
//  console.log(num1 + num2);
    
// };

export  class Suma{
    private resultado: number = 0;
    constructor(a: number, b: number){
        this.resultado = a+b;
    }
    public ver(){
        return this.resultado;

    }
}