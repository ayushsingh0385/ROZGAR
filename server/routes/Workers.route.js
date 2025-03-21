const express = require("express");
const { getReviews,addReview,createWorkers, getWorkers, getSingleWorkers, searchWorkers, updateWorkers } = require("../controller/Workers.controller");
const upload = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("imageFile"), createWorkers);
router.route("/").get(isAuthenticated, getWorkers);
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateWorkers);
router.route("/reviews/:id").post(addReview);
router.route("/reviews/:id").get(getReviews);
router.route("/search/:searchText").get(isAuthenticated, searchWorkers);
router.route("/:id").get(isAuthenticated, getSingleWorkers);

module.exports = router;
