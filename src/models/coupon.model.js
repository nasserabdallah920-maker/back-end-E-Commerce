const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, uppercase: true, required: true },
    type: { type: String, enum: ["fixed", "percentage"], required: true },
    value: {
      type: Number,
      required: true,
      min: 1,
    },
    maxDiscount: { type: Number, required: true },
    minOrder: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, required: true },
    usedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);
couponSchema.path("value").validate(function (value) {
  if (this.type === "percentage") {
    return value <= 100;
  }

  return true;
});
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
