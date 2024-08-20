import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    salt: { type: String },
    hash: { type: String },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: {
        unique: true,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mgrLevel: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    member: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hmember",
      },
      firstName: String,
      lastName: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
