class Carrito {
    constructor(id, date, productos){
        this.id = id
        this.date = new Date().now
        this.productos = productos
}
}
module.exports = Carrito;