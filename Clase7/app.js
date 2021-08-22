import express from "express";

let productos = []

class Producto {
    constructor(title,price,thumbnail){
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

const port = 8080;
const app = express();


const server = app.listen(port,()=>{
    console.log("Running at " + server.address().port)

})
productos.push(new Producto ("coffee", 100, "/coffee.jps"))
productos.push(new Producto ("Suggar", 5, "/sugar.jps"))
productos.push(new Producto ("Milk", 60, "/milk.jps"))

app.get("/api/productos/listar", (req, res) =>{
    try{
        if(productos.length > 0){
            res.status(200).json(productos)
        }else{
            res.status(404).json({"error": "There's not any product available."})
        }
    }catch(err){
        res.status(404).json({err})
    }
})
app.get("/api/productos/listar/:id",(req, res) =>{
    try{
        if(req.params.id <= (productos.length)){
            res.status(200).json(productos[req.params.id-1])
        }else{
            res.status(404).json({"error": "Product not found."})
        }
    }catch(err){
        res.status(404).json({err})
    }
})

app.post("/api/productos/guardar", (req,res)=>{

    try{
        productos.push(new Producto (req.query.title, parseInt(req.query.price), req.query.thumbnail))
        res.status(200).json(productos[productos.length-1])
    }catch(err){
        res.status(404).json(err)
    }
})

app.delete("/api/delete/:id", (req,res)=>{
    try{
        req.params.id
    }
})