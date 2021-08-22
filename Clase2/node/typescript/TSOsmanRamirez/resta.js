"use strict";
exports.__esModule = true;
exports.Resta = void 0;
// export default function Resta(num1: number, num2: number, calculo: string){
//     if(calculo === 'Resta'){
//        return num1 - num2;
//     }
//    };
var Resta = /** @class */ (function () {
    function Resta(a, b) {
        this.resultado = 0;
        this.resultado = a - b;
    }
    Resta.prototype.ver = function () {
        return this.resultado;
    };
    return Resta;
}());
exports.Resta = Resta;
