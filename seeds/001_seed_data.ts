import { Knex } from "knex";
import { v4 as uuid } from "uuid";

export async function seed(knex: Knex): Promise<void> {

  await knex("passengers").insert([
    { id: uuid(), name: "Rahul", phone: "9999999999", email: "rahul@test.com" },
    { id: uuid(), name: "Amit", phone: "8888888888", email: "amit@test.com" }
  ]);

  await knex("cabs").insert([
    { id: uuid(), license_plate: "MH12AB1234", driver_name: "Driver1", max_passengers: 4, max_luggage: 6, status: "AVAILABLE" }
  ]);
}
