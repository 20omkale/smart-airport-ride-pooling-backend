# Smart Airport Ride Pooling Backend System

## Overview

This project implements a Smart Airport Ride Pooling Backend that groups passengers into shared cabs while respecting:

* Maximum seat capacity (4 passengers per cab)
* Maximum luggage capacity (6 items per cab)
* Maximum detour tolerance (default 5 km)
* Route optimization for minimal travel deviation

The system is designed to support high concurrency, transactional consistency, and scalable ride pooling operations.

---

## Features

* Ride request creation API
* Ride matching and pooling algorithm (O(n²))
* Seat and luggage constraint validation
* Transaction-safe pool creation
* Ride cancellation handling
* Dynamic pricing calculation
* Docker-based PostgreSQL and Redis setup

---

## Technology Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Knex.js (Migrations & Seeds)
* Redis (future caching & queue processing)
* Docker

---

## Setup Instructions

### 1. Start Infrastructure

```bash
docker compose up -d
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Database Migrations

```bash
npx knex migrate:latest
```

### 4. Seed Test Data

```bash
npx knex seed:run
```

### 5. Start Backend

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## API Endpoints

### Create Ride

POST `/api/rides`

### Run Matching

POST `/api/rides/match`

### Cancel Ride

DELETE `/api/rides/:id`

---

## Algorithm Approach

Ride requests are compared pairwise to find compatible pools based on pickup and drop proximity.

* Matching complexity: **O(n²)**
* Route optimization complexity: **O(k²)**

This deterministic approach ensures reliable pooling decisions for moderate traffic volumes.
Future versions can use spatial indexing (geohashing) for improved scalability.

---

## Concurrency Strategy

All pool creation operations use **database transactions and row-level locking** to ensure that simultaneous ride requests do not over-allocate seats or create inconsistent pools.

---

## Performance Targets

* Supports ~100 requests/sec locally
* Matching latency under 300 ms
* Horizontally scalable stateless API servers

---

## Future Improvements

* Redis queue-based asynchronous matching
* Geospatial indexing for faster ride search
* ML-based dynamic surge pricing
* Real-time driver dispatch integration
