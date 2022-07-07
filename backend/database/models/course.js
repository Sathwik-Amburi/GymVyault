const mongoose = require("mongoose");

// TODO: Add remaining fields, Add remaining Schemas
const CourseSchema = new mongoose.Schema({
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gym", required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
