import { Request, Response } from "express";
import {
  createRideRequest,
  cancelRide
} from "../services/rideService";
import { matchPendingRides } from "../services/matchingService";

/* create ride */
export const createRide = async (req: Request, res: Response) => {
  try {
    const id = await createRideRequest(req.body);
    res.json({ message: "Ride created", id });
  } catch (err) {
    res.status(500).json({ error: "Create ride failed" });
  }
};

/* cancel ride */
export const cancelRideController = async (req: Request, res: Response) => {
  try {
    await cancelRide(req.params.id);
    res.json({ message: "Ride cancelled" });
  } catch (err) {
    res.status(500).json({ error: "Cancel failed" });
  }
};

/* manual matching trigger */
export const triggerMatching = async (req: Request, res: Response) => {
  try {
    await matchPendingRides();
    res.json({ message: "Matching executed" });
  } catch (err) {
    res.status(500).json({ error: "Matching failed" });
  }
};
