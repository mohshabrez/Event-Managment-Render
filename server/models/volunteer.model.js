import mongoose from "mongoose"

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  skills: [String],
  availability: {
    type: String,
    required: true,
  },
  areasOfInterest: [String],
  assignedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export const Volunteer = mongoose.model("Volunteer", volunteerSchema);


