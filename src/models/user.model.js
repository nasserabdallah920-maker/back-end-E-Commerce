const mongoose = require("mongoose");
const { hashPassword } = require("../utils/bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    refreshToken: {
      type: String,
      select:false
    },
    isBlocked: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return 
  }
  this.password = await hashPassword(this.password)
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
