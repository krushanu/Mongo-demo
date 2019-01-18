const mongoose = require('mongoose');
const pageNumber = 2;
const pageSize = 10;

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to DB ..'))
  .catch(err => console.error('Could not connect to DB !!', err));

const courseSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    // name: 'Angular Course',
    author: 'Krushanu',
    tags: ['angular', 'frontend'],
    isPublished: true
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log('exceptoin: ', ex.message);
  }
}
async function getCourses() {
  const courses = await Course.find({ author: /^kru/i, isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

createCourse();
// getCourses();
