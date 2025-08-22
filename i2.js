const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/* app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
}); */

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);
  if (!course) return res.status(404).send("course not found");
  res.send(course.name);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);
  if (!course) return res.status(404).send("course not found");
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);
  if (!course) return res.status(404).send("course not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
