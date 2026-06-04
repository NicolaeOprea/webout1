// Copy this into the Center backend if you need a one-time business admin seed.
// Do not commit real passwords. Run it only in the backend environment.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Business } from "../src/models/Business.js";
import { User } from "../src/models/User.js";

const MONGODB_URI = process.env.MONGODB_URI;
const BUSINESS_SLUG = process.env.BUSINESS1_SLUG || "sapore-mediterraneo";
const ADMIN_NAME = process.env.ADMIN1_NAME || "Restaurant Admin";
const ADMIN_EMAIL = process.env.ADMIN1_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN1_PASSWORD;

if (!MONGODB_URI || !ADMIN_PASSWORD) {
  throw new Error("Set MONGODB_URI and ADMIN1_PASSWORD before running this seed.");
}

await mongoose.connect(MONGODB_URI);

const business = await Business.findOne({
  slug: BUSINESS_SLUG,
  status: "active",
  isActive: { $ne: false }
});

if (!business) {
  throw new Error(`Active business not found for slug: ${BUSINESS_SLUG}`);
}

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

await User.findOneAndUpdate(
  { email: ADMIN_EMAIL.toLowerCase(), businessId: business._id },
  {
    businessId: business._id,
    name: ADMIN_NAME,
    email: ADMIN_EMAIL.toLowerCase(),
    passwordHash,
    role: "business_admin",
    isActive: true
  },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);

await mongoose.disconnect();
console.log(`Business admin ready: ${ADMIN_EMAIL} for ${BUSINESS_SLUG}`);
