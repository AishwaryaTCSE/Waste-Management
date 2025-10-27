import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * @desc    Middleware to protect admin routes
 * @usage   Use in routes like: router.get('/dashboard', protectAdmin, controllerFn)
 */
export const protectAdmin = async (req, res, next) => {
  let token;

  try {
    // Check Authorization header for "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure token has admin role
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Not an admin" });
      }

      // Find the admin in DB and attach to request
      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      req.admin = admin;
      return next();
    }

    // If no token provided
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
