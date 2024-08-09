import mongoose from "mongoose";

module.exports.typeCode = { chipCredit: 1, renewal: 2 };
module.exports.typeStr = ["none", "Chip Credit", "Renewal"];
module.exports.paidBy = { square: 1, cash: 2, check: 3, etf: 4, referral: 5 };
module.exports.paidStr = ["none", "square", "cash", "check", "etf", "referral"];

const transactionSchema = new mongoose.Schema(
  {
    typeCode: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    paidBy: {
      type: Number,
      required: true,
      default: 0,
    },
    hiker: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hmember",
      },
      username: String,
    },
  },
  { timestamps: true }
);

// const Transaction = mongoose.model("Transaction", transactionSchema);
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
