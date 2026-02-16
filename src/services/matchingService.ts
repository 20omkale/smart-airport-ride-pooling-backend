import db from "../utils/database";
import { haversineDistance } from "../utils/distance";

/**
 * Build optimized route using Nearest Neighbor approximation
 * This minimizes total deviation of pooled route
 */
function optimizeRoute(points: any[]) {
  if (points.length === 0) return [];

  const visited = new Set<number>();
  const route: any[] = [];

  let current = points[0];
  route.push(current);
  visited.add(0);

  while (route.length < points.length) {
    let nearestIndex = -1;
    let nearestDistance = Infinity;

    points.forEach((p, i) => {
      if (!visited.has(i)) {
        const d = haversineDistance(
          current.lat,
          current.lng,
          p.lat,
          p.lng
        );
        if (d < nearestDistance) {
          nearestDistance = d;
          nearestIndex = i;
        }
      }
    });

    current = points[nearestIndex];
    route.push(current);
    visited.add(nearestIndex);
  }

  return route;
}

/**
 * Calculate total route distance
 */
function calculateRouteDistance(route: any[]) {
  let total = 0;
  for (let i = 0; i < route.length - 1; i++) {
    total += haversineDistance(
      route[i].lat,
      route[i].lng,
      route[i + 1].lat,
      route[i + 1].lng
    );
  }
  return total;
}

/**
 * Match pending rides into pools minimizing deviation
 */
export async function matchPendingRides() {

  const rides = await db("ride_requests")
    .where({ status: "PENDING" });

  if (rides.length < 2) return;

  for (let i = 0; i < rides.length; i++) {
    for (let j = i + 1; j < rides.length; j++) {

      const r1 = rides[i];
      const r2 = rides[j];

      const pickupDistance = haversineDistance(
        r1.pickup_lat,
        r1.pickup_lng,
        r2.pickup_lat,
        r2.pickup_lng
      );

      if (pickupDistance > 5) continue;

      const points = [
        { lat: r1.pickup_lat, lng: r1.pickup_lng },
        { lat: r2.pickup_lat, lng: r2.pickup_lng },
        { lat: r1.dropoff_lat, lng: r1.dropoff_lng },
        { lat: r2.dropoff_lat, lng: r2.dropoff_lng }
      ];

      const optimizedRoute = optimizeRoute(points);

      const optimizedDistance = calculateRouteDistance(optimizedRoute);

      const directDistance =
        haversineDistance(
          r1.pickup_lat,
          r1.pickup_lng,
          r1.dropoff_lat,
          r1.dropoff_lng
        ) +
        haversineDistance(
          r2.pickup_lat,
          r2.pickup_lng,
          r2.dropoff_lat,
          r2.dropoff_lng
        );

      const deviation = optimizedDistance - directDistance;

      // detour tolerance check
      if (deviation > Math.max(r1.max_detour_km, r2.max_detour_km)) continue;

      const poolId = `POOL-${Date.now()}`;

      await db.transaction(async trx => {

        await trx("ride_requests")
          .whereIn("id", [r1.id, r2.id])
          .update({
            status: "MATCHED",
            pool_id: poolId
          });

        await trx("ride_pools").insert({
          id: poolId,
          total_passengers: r1.num_passengers + r2.num_passengers,
          total_luggage: r1.luggage_count + r2.luggage_count,
          total_distance_km: optimizedDistance
        });

      });

      console.log("Created optimized pool:", poolId);
    }
  }
}
