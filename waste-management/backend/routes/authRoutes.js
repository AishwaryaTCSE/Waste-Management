import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";


const router = express.Router();


// Admin signup/login
router.post("/admin/signup", registerAdmin);
router.post("/admin/login", loginAdmin);


export default router;