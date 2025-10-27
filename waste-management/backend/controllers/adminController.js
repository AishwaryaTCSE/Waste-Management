import Request from "../models/Request.js";
import Team from "../models/Team.js";
import { getIO } from "../config/socket.js";

/**
 * @desc    Get all waste pickup requests
 * @route   GET /api/admin/requests
 * @access  Private (Admin)
 */
export const getAllRequests = async (req, res, next) => {
  try {
    const { status, area, from, to } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (area) filter.area = area;
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);

    const requests = await Request.find(filter)
      .populate("assignedTeam")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update request status (Pending → Accepted → In Progress → Completed)
 * @route   PUT /api/admin/requests/:id/status
 * @access  Private (Admin)
 */
export const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    if (!["Pending", "Accepted", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await request.save();

    // Notify via socket
    try {
      getIO().emit("request:statusUpdated", request);
    } catch (e) {
      console.warn("Socket emit failed:", e.message);
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Assign a team to a specific request
 * @route   PUT /api/admin/requests/:id/assign
 * @access  Private (Admin)
 */
export const assignTeam = async (req, res, next) => {
  try {
    const { id } = req.params; // request id
    const { teamId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const request = await Request.findByIdAndUpdate(
      id,
      { assignedTeam: teamId },
      { new: true }
    ).populate("assignedTeam");

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Notify via socket
    try {
      getIO().emit("request:teamAssigned", request);
    } catch (e) {
      console.warn("Socket emit failed:", e.message);
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get basic analytics for dashboard
 * @route   GET /api/admin/analytics
 * @access  Private (Admin)
 */
export const getAnalytics = async (req, res, next) => {
  try {
    const total = await Request.countDocuments();
    const completed = await Request.countDocuments({ status: "Completed" });
    const pending = await Request.countDocuments({ status: "Pending" });

    // Area-wise aggregation
    const areaAggregation = await Request.aggregate([
      { $group: { _id: "$area", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ total, completed, pending, areaAggregation });
  } catch (err) {
    next(err);
  }
};
