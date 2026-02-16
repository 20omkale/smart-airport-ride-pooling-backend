# Algorithm Analysis

## Matching Algorithm
Ride requests are compared pairwise to identify compatible pooling candidates based on pickup proximity, seat capacity, luggage capacity, and detour tolerance.

### Time Complexity
Matching Search: O(n²)

Each ride request is compared with every other ride request to evaluate compatibility.

Route Optimization: O(k²)

Nearest Neighbor approximation is used to optimize route order among pooled passengers.

Overall Complexity: O(n² + k²)

### Space Complexity
O(n)

Stores ride requests and temporary pooling structures.

## Optimization Strategy
- Nearest Neighbor routing approximation minimizes total travel deviation.
- Queue-based worker ensures asynchronous matching and prevents API latency spikes.
