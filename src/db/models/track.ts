import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    meetupEventId: {
      type: Number,
      default: 0,
    },
    chipCode: {
      type: String,
      required: true,
      trim: true,
    },
    chipLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    chipEarned: Boolean,
    chipReceived: Boolean,
    eventDate: Date,
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },

    duesStatus: Number,
    hiker: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hmember",
      },
      username: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

// const Track = mongoose.model("Track", trackSchema);
const Track = mongoose.models.Track || mongoose.model("Track", trackSchema);

export default Track;
