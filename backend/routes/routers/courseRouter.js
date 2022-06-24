const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/courseController");

router.get("/get-all-courses", courseController.getAllCourses);
router.post("/add-course", courseController.addCourse);
router.get("/filter", courseController.filterCourses);
router.get("/get/:id", courseController.getCourse);

module.exports = router;
