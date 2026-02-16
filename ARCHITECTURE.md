# High Level Architecture

## Overview
The Smart Airport Ride Pooling System groups ride requests into shared pools while maintaining seat, luggage, and detour constraints.  
The backend is designed for high concurrency and low latency.

## Architecture Diagram (Logical)

Client (Mobile / Web)
        │
        ▼
API Gateway / Express Server
        │
        ▼
Ride Service Layer
 ├── Ride Request Service
 ├── Matching Engine (Pooling Algorithm)
 ├── Pricing Service
 └── Cancellation Service
        │
        ▼
PostgreSQL Database
        │
        ▼
Redis (Caching / Future Queue Processing)

## Flow
1. Client submits ride request
2. Ride stored as PENDING
3. Matching service periodically groups compatible rides
4. Pool created transactionally
5. Pricing calculated dynamically
6. Users receive pooled ride assignment

## Scalability
- Stateless API servers allow horizontal scaling
- DB connection pooling ensures high throughput
- Redis can be used for background matching queues
