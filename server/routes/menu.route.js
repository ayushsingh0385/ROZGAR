const express = require("express");
const upload = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addMenu, EditWorkerProfile } = require("../controller/menu.controller");

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("image"), EditWorkerProfile);

module.exports = router;
