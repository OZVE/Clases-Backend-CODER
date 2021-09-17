const conectarMaria = require('./mariadb')
const sqlite = require('./sqlite3')
const knex = require('knex')(conectarMaria)
const sqlite3 = require('knex')(sqlite)

sqlite3.schema.hasTable("lista").then(exist => {
  if(!exist) {    
return sqlite3.schema.createTable('ms', (table)=> {
  table.increments().primary();
  table.string("mensaje", 250);
}).then (
  (console.log('tabla creada'),

  (err) => console.log(err),
  () => sqlite3.destroy())
)
}
})



knex.schema.hasTable("lista").then(exist => {
  if(!exist) {

    return knex.schema.createTable('lista', (table)=> {
      table.increments("id").primary();
      table.datetime("date", { precision: 6 }).defaultTo(knex.fn.now(6));
      table.string("name", 100).notNullable();
      table.string("description", 250);
      table.integer("code").notNullable();
      table.string("picture", 255);
      table.integer("price").notNullable();
      table.integer("stock").notNullable();
  }).then (
      (console.log('tabla creada'),
  
  
      (err) => console.log(err),
      () => knex.destroy())
  )
  }
})

knex.schema.hasTable("carrito").then(exist => {
  if(!exist) {

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

  knex.schema.hasTable("relprod").then(exist => {
    if(!exist) {
  
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
    

  
module.exports = {knex, conectarMaria}