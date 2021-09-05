const productos = require('../rutas/productos.rutas')
console.log(productos)
class Producto {
    constructor(name, description, code, picture, price, stock){
        this.id = productos.items
        this.date = new Date()
        this.name = name
        this.description = description
        this.code = code
        this.picture = picture
        this.price = price
        this.stock = stock
    }
}
module.exports= Producto;