const { required } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/emtest")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  /*  const course = await Course.findById(courseId);
  course.author.name = "Madhumitha";
  course.save(); */
  const course = await Course.updateOne(
    { _id: courseId },
    { $set: { "author.name": "hazel" } }
    //{ $unset: { author: "" } }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function updatearr(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.name = "Hazel";
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne();
  course.save();
}

updatearr("68aa7b749be38957a8baf9c6", "68aa7b749be38957a8baf9c4");

//removeAuthor("68aa7b749be38957a8baf9c6", "68aa86423dd05ce5e01d74c9");

//addAuthor("68aa7b749be38957a8baf9c6", new Author({ name: "Hazel" }));

//updateAuthor("68aa79f4b1297c0777f90eb3");

/* createCourse("C1", [
  new Author({ name: "Uthara" }),
  new Author({ name: "Yasha" }),
]); */
