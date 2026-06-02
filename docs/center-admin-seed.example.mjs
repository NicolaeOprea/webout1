// Copy this into the Center backend if you need a one-time superadmin seed.
// Do not commit real passwords. Run it only in the backend environment.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "../src/models/User.js";

const MONGODB_URI = process.env.MONGODB_URI;
const SUPERADMIN_NAME = process.env.SUPERADMIN1_NAME || "Super Admin";
const SUPERADMIN_EMAIL = process.env.SUPERADMIN1_EMAIL || "admin@example.com";
const SUPERADMIN_PASSWORD = process.env.SUPERADMIN1_PASSWORD;

if (!MONGODB_URI || !SUPERADMIN_PASSWORD) {
  throw new Error("Set MONGODB_URI and SUPERADMIN1_PASSWORD before running this seed.");
}

await mongoose.connect(MONGODB_URI);

const passwordHash = await bcrypt.hash(SUPERADMIN_PASSWORD, 10);

await User.findOneAndUpdate(
  { email: SUPERADMIN_EMAIL.toLowerCase(), businessId: null },
  {
    businessId: null,
    name: SUPERADMIN_NAME,
    email: SUPERADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: "superadmin",
    isActive: true
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

await mongoose.disconnect();
console.log(`Superadmin ready: ${SUPERADMIN_EMAIL}`);
