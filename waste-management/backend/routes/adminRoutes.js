import express from "express";
import {
getAllRequests,
updateRequestStatus,
assignTeam,
getAnalytics,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();


// All routes below require admin token
router.use(protectAdmin);


router.get("/requests", getAllRequests);
router.put("/requests/:id/status", updateRequestStatus);
router.put("/requests/:id/assign", assignTeam);
router.get("/analytics", getAnalytics);


export default router;