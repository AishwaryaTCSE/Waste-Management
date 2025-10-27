import mongoose from "mongoose";


const requestSchema = new mongoose.Schema(
{
citizenName: { type: String },
area: { type: String, required: true },
wasteType: { type: String },
notes: { type: String },
status: {
type: String,
enum: ["Pending", "Accepted", "In Progress", "Completed"],
default: "Pending",
},
assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
location: {
lat: { type: Number },
lng: { type: Number },
},
},
{ timestamps: true }
);


export default mongoose.model("Request", requestSchema);