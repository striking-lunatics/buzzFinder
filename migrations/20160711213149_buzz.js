
exports.up = function(knex, Promise) {


    return Promise.all([

        knex.schema.createTable('breweries', function(table) {
            table.string('id').primary();
            table.string('name');
       
            table.timestamps();
        })
        
    ])
};

exports.down = function(knex, Promise) {  
    return Promise.all([
        knex.schema.dropTable('breweries'),
    ])
};
