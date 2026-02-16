import { Worker } from "bullmq";
import { redisConfig } from "../utils/redis";
import { matchPendingRides } from "../services/matchingService";

const worker = new Worker(
  "rideQueue",
  async job => {
    if (job.name === "matchRide") {
      console.log("Processing matching job...");
      await matchPendingRides();
    }
  },
  { connection: redisConfig }
);

worker.on("completed", () => {
  console.log("Matching job completed");
});
