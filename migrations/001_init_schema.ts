import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable("passengers", t => {
    t.uuid("id").primary();
    t.string("name");
    t.string("phone");
    t.string("email");
  });

  await knex.schema.createTable("cabs", t => {
    t.uuid("id").primary();
    t.string("license_plate");
    t.string("driver_name");
    t.integer("max_passengers");
    t.integer("max_luggage");
    t.string("status");
  });

  await knex.schema.createTable("ride_pools", t => {
    t.uuid("id").primary();
    t.integer("total_passengers");
    t.integer("total_luggage");
    t.string("status");
  });

  await knex.schema.createTable("ride_requests", t => {
    t.uuid("id").primary();
    t.uuid("passenger_id");
    t.float("pickup_lat");
    t.float("pickup_lng");
    t.float("dropoff_lat");
    t.float("dropoff_lng");
    t.integer("num_passengers");
    t.integer("luggage_count");
    t.float("max_detour_km");
    t.string("status");
    t.uuid("pool_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("ride_requests");
  await knex.schema.dropTableIfExists("ride_pools");
  await knex.schema.dropTableIfExists("cabs");
  await knex.schema.dropTableIfExists("passengers");
}
