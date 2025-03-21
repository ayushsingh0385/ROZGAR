const express = require("express");
const passport = require("passport");
const { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } = require("../controller/user.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

module.exports = router;
