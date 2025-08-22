const courses = require("./routes/n1r.js");
const express = require("express");
const app = express();
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

app.use("/api/courses", courses);

mongoose
  .connect("mongodb://localhost:27017/nodepractice")
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("could not connect", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
