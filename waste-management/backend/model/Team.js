import mongoose from "mongoose";


const teamSchema = new mongoose.Schema(
{
name: { type: String, required: true },
vehicleNumber: { type: String },
members: [{ type: String }],
isActive: { type: Boolean, default: true },
},
{ timestamps: true }
);


export default mongoose.model("Team", teamSchema);