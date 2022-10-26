import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MonoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true,minlength:10,maxlength:15 },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Ex",
    author: "Milad hassani",
    tags: ["js", "frontEnd"],
    isPublished: true,
    price: 10000,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
async function showCourse() {
  const courses = await Course.find({ name: /^n/i });
  console.log(courses);
}

// showCourse()
createCourse();
