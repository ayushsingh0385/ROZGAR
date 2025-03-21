const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            default: "Update your address"
        },
        city: {
            type: String,
            default: "Update your city"
        },
        country: {
            type: String,
            default: "Update your country"
        },
        profilePicture: {
            type: String,
            default: ""
        },
        admin: {
            type: Boolean,
            default: false
        },
        // Advanced authentication
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordTokenExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {User};