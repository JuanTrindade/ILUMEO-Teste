const knex = require("knex");
const knexfile = require("../../knexfile");

try {
    const db = knex(knexfile.development)
    module.exports = db;
} catch (error) {
    console.log(error);
}