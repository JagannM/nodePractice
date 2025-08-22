const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
});

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;
