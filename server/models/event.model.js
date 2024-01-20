import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  volunteerRoleRequirements: [
    {
      role: {
        type: String,
        enum: [
          "Registration Desk",
          "Food and Beverage",
          "Security",
          "Photographer",
          "Videographer",
          "Social Media Coordinator",
          "Cleanup Crew",
          "Transportation Coordinator",
          "Technical Support",
          "Decorations Team",
          "First Aid Provider",
          "Guest Services",
        ],
        required: true,
      },
      requiredVolunteers: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const Event = mongoose.model("Event", eventSchema);


