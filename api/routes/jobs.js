const testUser = require("../middleware/testUser");
const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require("../controllers/jobs");

router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(testUser, deleteJob).patch(testUser, updateJob);
router.route("/stats").get(showStats);

module.exports = router;
