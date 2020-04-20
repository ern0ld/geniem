//Testitietoa password-tableen
//Test data to password-table
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('passwords').del()
    .then(function () {
      // Inserts seed entries
      return knex('passwords').insert([
        {username: "example", hash: 'hashipassu'}

      ]);
    });
};
