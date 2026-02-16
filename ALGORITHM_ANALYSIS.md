# Algorithm Analysis

## Matching Algorithm

The system groups pending ride requests using a pairwise comparison approach.

### Steps
1. Fetch all pending rides
2. Compare each ride with others (pairwise)
3. Check:
   - Pickup distance ≤ 5 km
   - Dropoff distance ≤ 5 km
   - Seats ≤ 4
   - Luggage ≤ 6
4. Create ride pools transactionally

### Time Complexity
Matching: O(n²)  
Route optimization: O(k²)

Where:
n = pending ride requests  
k = rides in a pool

### Space Complexity
O(n) for ride storage in memory

### Why chosen
The O(n²) approach ensures deterministic matching and is acceptable for the assignment-scale load.  
In production, spatial indexing (R-tree / geohash) can reduce complexity.
