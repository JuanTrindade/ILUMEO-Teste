/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable("user", table => {
    table.increments("id").notNullable();
    table.string("user_code", 15).notNullable().unique();
    table.string("name", 255).notNullable();
  })
  .createTable("workingcontrol", table => {
    table.increments("id").notNullable();
    table.dateTime("entry_time");
    table.dateTime("departure_time");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("user");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("workingcontrol");
};
