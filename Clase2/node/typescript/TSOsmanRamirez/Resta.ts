// export default function Resta(num1: number, num2: number, calculo: string){
//     if(calculo === 'Resta'){
//        return num1 - num2;
//     }
//    };
export class Resta {
    private resultado: number = 0;
    constructor(a: number, b: number){
        this.resultado = a-b;
    }
    public ver(){
        return this.resultado;

    }
}