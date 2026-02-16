import db from "../utils/database";
import { haversineDistance } from "../utils/distance";

/**
 * Build optimized route using Nearest Neighbor approximation
 * Minimizes total travel deviation
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
 * Supports grouping up to 4 rides per pool
 */
export async function matchPendingRides() {

  const rides = await db("ride_requests")
    .where({ status: "PENDING" });

  if (rides.length < 2) return;

  for (let i = 0; i < rides.length; i++) {

    const group = [rides[i]];

    for (let j = i + 1; j < rides.length; j++) {

      if (group.length >= 4) break;

      const last = group[group.length - 1];

      const pickupDistance = haversineDistance(
        last.pickup_lat,
        last.pickup_lng,
        rides[j].pickup_lat,
        rides[j].pickup_lng
      );

      if (pickupDistance <= 5) {
        group.push(rides[j]);
      }
    }

    if (group.length < 2) continue;

    const points: any[] = [];

    group.forEach(r => {
      points.push({ lat: r.pickup_lat, lng: r.pickup_lng });
      points.push({ lat: r.dropoff_lat, lng: r.dropoff_lng });
    });

    const optimizedRoute = optimizeRoute(points);
    const optimizedDistance = calculateRouteDistance(optimizedRoute);

    const poolId = `POOL-${Date.now()}-${i}`;

    await db.transaction(async trx => {

      await trx("ride_requests")
        .whereIn("id", group.map(r => r.id))
        .update({
          status: "MATCHED",
          pool_id: poolId
        });

      await trx("ride_pools").insert({
        id: poolId,
        total_passengers: group.reduce((a, b) => a + b.num_passengers, 0),
        total_luggage: group.reduce((a, b) => a + b.luggage_count, 0),
        total_distance_km: optimizedDistance
      });

    });

    console.log("Created multi-ride pool:", poolId);
  }
}
