import mongoose from "mongoose";

const chipSchema = new mongoose.Schema(
  {
    chipCode: {
      type: String,
      required: true,
      trim: true,
    },
    hikeLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    hikeTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// const chip = mongoose.model("Chip", chipSchema);
const chip = mongoose.models.Chip || mongoose.model("Chip", chipSchema);

export default chip;
