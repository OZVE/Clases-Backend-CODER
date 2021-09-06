class Carrito {
    constructor(id, producto){
        this.id = id
        this.date = new Date()
        this.productos = [{producto}]
    }
}
module.exports = Carrito;