import mongoose from "mongoose";

const hmemberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    meetupId: {
      type: Number,
      default: 0,
    },
    mainPhone: String,
    email: String,
    address: String,
    gender: String,
    city: String,
    state: String,
    zip: String,
    emerContact: String,
    emerRelation: String,
    emerPhone: String,
    hikerName: String,
    birthday: Date,
    chipCollector: Number,
    chipCreditTotal: Number,
    chipHikeTotal: Number,
    chipReceivedTotal: Number,
    waiverAccepted: Boolean,
    waiverTimestamp: Date,
    waiverSignature: String,
    perRespAccepted: Boolean,
    perRespTimestamp: Date,
    perRespSignature: String,
    duesLastPaid: Date,
    duesAmountpaid: Number,
    duesFrom: Date,
    duesTo: Date,
    memberStatus: Boolean,
    waiverStatus: Boolean,
    duesStatus: Number,
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
    },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  },
  { timestamps: true }
);

// const Hmember = mongoose.model("Hmember", hmemberSchema);
const Hmember =
  mongoose.models.Hmember || mongoose.model("Hmember", hmemberSchema);

export default Hmember;
