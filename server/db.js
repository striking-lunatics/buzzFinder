/*
 * basic db file that configures knex migrations working with our database.
 */

var config      = require('../knexfile.js');  
var env         = 'development';  
var knex        = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]); 