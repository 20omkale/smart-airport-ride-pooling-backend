import { Router } from "express";
import {
  createRide,
  cancelRideController,
  triggerMatching
} from "../controllers/rideController";

const router = Router();

/* create ride */
router.post("/rides", createRide);

/* cancel ride */
router.delete("/rides/:id", cancelRideController);

/* matching trigger (POST) */
router.post("/rides/match", triggerMatching);

/* matching trigger (GET for browser test) */
router.get("/rides/match", triggerMatching);

/* test endpoint */
router.get("/rides", (req,res)=>{
  res.send("Ride endpoint working");
});

export default router;
