"use strict";
// export default function Suma(num1: number, num2: number,){
//  console.log(num1 + num2);
exports.__esModule = true;
exports.Suma = void 0;
// };
var Suma = /** @class */ (function () {
    function Suma(a, b) {
        this.resultado = 0;
        this.resultado = a + b;
    }
    Suma.prototype.ver = function () {
        return this.resultado;
    };
    return Suma;
}());
exports.Suma = Suma;
