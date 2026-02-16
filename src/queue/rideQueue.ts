import { Queue } from "bullmq";
import { redisConfig } from "../utils/redis";

export const rideQueue = new Queue("rideQueue", {
  connection: redisConfig
});
