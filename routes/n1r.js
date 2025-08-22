const { Course, validateCourse } = require("../models/n1m.js");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

router.use(express.json());

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

router.post("/", async (req, res) => {
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  let course = new Course({ name: req.body.name });
  course = await course.save();
  console.log(course);
  res.send(course);
});

/* router.put("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  course.set({ name: req.body.name });
  const updatedCourse = await course.save();
  res.send(updatedCourse);
}); */

router.put("/:id", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );
  res.send(course);
});

router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

module.exports = router;
