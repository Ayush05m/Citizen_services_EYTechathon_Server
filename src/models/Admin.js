import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export function initializeAdmin() {
  console.log("Initializing admin");
  Admin.findOne({ email: "admin@example.com" }).then((admin) => {
    if (!admin) {
      const admin = new Admin({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "super_admin",
      });
      admin.save();
      console.log("Admin initialized");
    } else {
      console.log("Admin already initialized");
    }
  });
}

export default mongoose.model("Admin", adminSchema);
