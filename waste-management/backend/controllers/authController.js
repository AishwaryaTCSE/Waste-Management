import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";


export const registerAdmin = async (req, res, next) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) {
return res.status(400).json({ message: "Please provide name, email and password" });
}


const exists = await Admin.findOne({ email });
if (exists) return res.status(400).json({ message: "Admin already exists" });


const admin = await Admin.create({ name, email, password });


res.status(201).json({
_id: admin._id,
name: admin.name,
email: admin.email,
token: generateToken(admin._id, "admin"),
});
} catch (err) {
next(err);
}
};


export const loginAdmin = async (req, res, next) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: "Provide email and password" });


const admin = await Admin.findOne({ email });
if (admin && (await admin.matchPassword(password))) {
res.json({
_id: admin._id,
name: admin.name,
email: admin.email,
token: generateToken(admin._id, "admin"),
});
} else {
res.status(401).json({ message: "Invalid credentials" });
}
} catch (err) {
next(err);
}
};