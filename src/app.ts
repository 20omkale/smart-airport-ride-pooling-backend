import express from "express";
import rideRoutes from "./routes/ride.routes";

const app = express();

app.use(express.json());

// health route
app.get("/", (req, res) => {
  res.send("Smart Ride Pool Backend Running");
});

// api routes
app.use("/api", rideRoutes);

export default app;
