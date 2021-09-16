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

knex.schema.hasTable('lista').then(function(exist){
  if(!exist){
   return knex.schema.createTable('lista', (table)=> {
          table.increments("id").primary();
          table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
          table.integer("qty").notNullable();
          table.string("name", 100).notNullable();
          table.string("description", 250);
          table.integer("code").notNullable();
          table.string("picture", 255);
          table.integer("price").notNullable();
          table.integer("stock").notNullable();
      }).then(console.log('tabla creada'))
    }
});







knex.schema.hasTable('carrito').then(function(exist){
  if(!exist){
   return knex.schema.createTable('carrito', (table)=> {
        table.increments("id").primary();
        table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
    }).then (
        (console.log('tabla creada'),
    
        (err) => console.log(err),
        () => knex.destroy())
      )
  }
})

knex.schema.hasTable('union').then(function(exist){
  if(!exist){
   return knex.schema.createTable('relprod', (table)=> {
          table.integer("id-carrito");
          table.integer("id-producto");
          table.integer("qty");
          table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
      }).then (
          (console.log('tabla creada'),
      
    
        (err) => console.log(err),
        () => knex.destroy())
      )
  }
})  
module.exports = {guardarProducto, knex, conectarMaria}