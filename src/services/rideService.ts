import db from "../utils/database";
import { v4 as uuid } from "uuid";
import { rideQueue } from "../queue/rideQueue";

/**
 * Create ride request and push to matching queue
 */
export async function createRideRequest(data:any){

  const id = uuid();

  await db("ride_requests").insert({
    id,
    passenger_id: data.passenger_id,
    pickup_lat: data.pickup_lat,
    pickup_lng: data.pickup_lng,
    dropoff_lat: data.dropoff_lat,
    dropoff_lng: data.dropoff_lng,
    num_passengers: data.num_passengers,
    luggage_count: data.luggage_count,
    max_detour_km: data.max_detour_km,
    status:"PENDING"
  });

  await rideQueue.add("matchRide", { rideId: id });

  return id;
}

export async function cancelRide(id:string){
  await db("ride_requests").where({id}).update({status:"CANCELLED"});
}
