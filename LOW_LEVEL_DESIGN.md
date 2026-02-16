# Low Level Design

## Main Components

RideController  
RideService  
MatchingService  
PricingService  
Database Layer  

## Class Relationships

RideController → RideService  
RideService → MatchingService  
RideService → PricingService  
RideService → Database  

## Design Patterns Used

- Singleton: Database connection instance
- Repository: Services interact with DB tables
- Strategy: Pricing strategies (surge / pooled)
- Factory: Ride pool creation

## Sequence (Ride Matching)

Client → RideController → RideService  
RideService → MatchingService  
MatchingService → Database (transaction)  
Database → Pool created  
Response returned
