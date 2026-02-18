const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// ✅ load .env
dotenv.config();

// ✅ Correct path to schema
const userSchema = require("./schemas/userModel");

// ✅ Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "learnhubdb", // Optional: your database name
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

// ✅ Create Admin User
const createAdmin = async () => {
  try {
    const existingAdmin = await userSchema.findOne({ type: "Admin" });

    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.email);
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new userSchema({
      name: "Admin",
      email: "admin@learnhub.com",
      password: hashedPassword,
      type: "admin", // This assumes you use 'type' field for roles
    });

    await adminUser.save();
    console.log("✅ Admin created: admin@learnhub.com");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
    process.exit(1);
  }
};

// ✅ Start Script
const start = async () => {
  await connectToDB();
  await createAdmin();
};

start();
