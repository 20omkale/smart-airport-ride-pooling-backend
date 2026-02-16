# Smart Airport Ride Pooling Backend System

## Overview

This project implements a **Smart Airport Ride Pooling Backend** that groups passengers into shared cabs while optimizing routes and pricing.
The system demonstrates scalable backend architecture using a queue-based matching worker and PostgreSQL persistence.

---

## Features

* Ride request creation API
* Ride pooling & matching algorithm
* Seat and luggage constraint validation
* Detour tolerance enforcement
* Dynamic pricing calculation
* Ride cancellation handling
* Redis queue-based asynchronous processing
* Dockerized PostgreSQL and Redis setup

---

## Tech Stack

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* Knex (Migrations & Seeds)
* Redis
* BullMQ (Queue Worker)
* Docker

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/20omkale/smart-airport-ride-pooling-backend.git
cd smart-airport-ride-pooling-backend
```

### 2. Create Environment File

Create `.env` file in project root:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ridepool
PORT=3000
```

or run:

```bash
copy .env.example .env
```

### 3. Start Infrastructure

```bash
docker compose up -d
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Database Migrations

```bash
npx knex migrate:latest
```

### 6. Seed Sample Data

```bash
npx knex seed:run
```

### 7. Start Backend

```bash
npm run dev
```

### 8. Start Matching Worker

Open another terminal:

```bash
npm run worker
```

---

## API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | /api/rides       | Create ride request   |
| POST   | /api/rides/match | Trigger ride matching |
| DELETE | /api/rides/:id   | Cancel ride           |
| GET    | /api/rides       | Test endpoint         |

---

## Algorithm Approach

Ride matching uses pairwise comparison of ride requests to form pooling candidates while enforcing:

* Seat capacity constraints
* Luggage constraints
* Detour tolerance limits

Route optimization uses a **Nearest-Neighbor VRP approximation** to minimize total travel deviation.

### Complexity

* Matching: **O(n²)**
* Route optimization: **O(k²)**
* Space complexity: **O(n)**

---

## Architecture Overview

Client → Express API → Redis Queue → Matching Worker → PostgreSQL

The worker processes matching asynchronously to support high concurrency and maintain low API latency.

---

## Sample Test Passenger ID

```
11111111-1111-1111-1111-111111111111
```

---

## Run Summary

```bash
docker compose up -d
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
npm run worker
```
