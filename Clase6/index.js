import  express  from 'express'
import { readFileSync } from 'fs'

const productos = []
let iteradorItem = 0
let iteradorItems = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function readFile (file, productos) {
            try{
                const consultar =  readFileSync(file)
                const json = JSON.parse(consultar.toString('utf-8'));
                productos.push(json, {cantItems: json.length})
                
    }catch(err){
        throw new Error(err)
    } 
}

readFile('productos.txt', productos)


const app = express()
const port = 8080

const server = app.listen(port, ()=> {
    console.log('Servidor arranco desde '+ server.address().port)
})

app.get('/items/', (req, res) => {
    console.log('productos entregados')
    iteradorItems++
    res.json(productos)
})

app.get('/itemrandom/', (req, res) => {
    console.log('producto random mostrado')
    const random = getRandomInt(0,productos[0].length)
    iteradorItem++
    res.json({item: productos[0][random]})
})

app.get('/visitas/', (req, res) => {
    console.log('estan consultando las visitas')
    
    res.json({visitas:{items:iteradorItems, item:iteradorItem}})
})