# Low Level Design (Class Diagram)

```mermaid
classDiagram

class RideController {
  +createRide()
  +cancelRide()
  +getRide()
}

class RideService {
  +createRide()
  +cancelRide()
  +createPool()
}

class MatchingService {
  +findMatches()
  +optimizeRoute()
}

class PricingService {
  +calculateFare()
}

RideController --> RideService
RideService --> MatchingService
RideService --> PricingService
