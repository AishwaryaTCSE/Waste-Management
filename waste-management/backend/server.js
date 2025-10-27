import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { initSocket } from "./config/socket.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import logger from "./utils/logger.js";


dotenv.config();


// Connect DB
connectDB();


const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


// Error handler
app.use(errorHandler);


const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: "*" },
});


initSocket(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));