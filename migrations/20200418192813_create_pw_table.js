//Uusi table tietokantaan
//New table to database
const { tables } = require('./../constants');
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable(tables.PW_TABLE, table => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('hash');

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists(tables.PW_TABLE);

};
