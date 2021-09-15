const conectarMaria = require('./mariadb.js')

const knex = require('knex')(conectarMaria)

function guardarProducto (name, description, code, picture, price, stock) {

  knex('lista').insert({
    qty: 1,
    name: name,
    description: description,
    code: code,
    picture: picture,
    price: price,
    stock: stock
    
  }).then( id => knex('lista').select('*').where({'id': id[0]}).then((data) => console.log(data)))
  // knex("lista").select("*").then((d) => console.log(d))
  return false 
  
}



// knex.schema.createTable('lista', (table)=> {
//     table.increments("id").primary();
//     table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
//     table.integer("qty").notNullable();
//     table.string("name", 100).notNullable();
//     table.string("description", 250);
//     table.integer("code").notNullable();
//     table.string("picture", 255);
//     table.integer("price").notNullable();
//     table.integer("stock").notNullable();
// }).then (
//     (console.log('tabla creada'),


//     (err) => console.log(err),
//     () => knex.destroy())
// )


module.exports = {guardarProducto, knex, conectarMaria}