# High Level Architecture Diagram

```mermaid
flowchart LR

Client[Mobile / Web Client]

API[Node.js Express API Server]

DB[(PostgreSQL Database)]

Redis[(Redis Queue)]

Worker[Matching Worker]

Client --> API
API --> DB
API --> Redis
Redis --> Worker
Worker --> DB
