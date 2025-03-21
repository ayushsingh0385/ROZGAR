const { Workers } = require("../models/Workers.model"); // Ensure correct import
const uploadImageOnCloudinary = require("../utils/imageUpload");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");

// Create Workers
exports.createWorkers = async (req, res) => {
    try {
        const { WorkersName, city, country, contactNo, cuisines } = req.body;
        const file = req.file;

        // Check if Workers already exists for the user
        const existingWorkers = await Workers.findOne({ user: req.id });
        if (existingWorkers) {
            return res.status(400).json({ success: false, message: "Workers already exists for this user" });
        }

        // Validate image file
        if (!file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadImageOnCloudinary(file);

        // Create new Workers
        const newWorkers = await Workers.create({
            user: req.id,
            WorkersName,
            city,
            country,
            contactNo,
            cuisines: JSON.parse(cuisines),
            imageUrl,
        });

        return res.status(201).json({ success: true, message: "Workers Added", Workers: newWorkers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get Workers
exports.getWorkers = async (req, res) => {
    try {
        const workers = await Workers.findOne({ user: req.id }).populate("menus");

        if (!workers) {
            return res.status(404).json({ success: false, workers: [], message: "Workers not found" });
        }

        return res.status(200).json({ success: true, workers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update Workers
exports.updateWorkers = async (req, res) => {
    try {
        const { WorkersName, city, country, contactNo, cuisines } = req.body;
        const file = req.file;

        // Find Workers by user ID
        const workers = await Workers.findOne({ user: req.id });
        if (!workers) {
            return res.status(404).json({ success: false, message: "Workers not found" });
        }

        // Update Workers fields
        workers.WorkersName = WorkersName;
        workers.city = city;
        workers.country = country;
        workers.contactNo = contactNo;
        workers.cuisines = JSON.parse(cuisines);

        // Update image if a new file is provided
        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            workers.imageUrl = imageUrl;
        }

        // Save updated Workers
        await workers.save();

        return res.status(200).json({ success: true, message: "Workers updated", Workers: workers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Add Review
exports.addReview = async (req, res) => {
    try {
        const { id } = req.params; // Workers ID
        let { userId, fullname, rating, comment } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        // Convert userId to ObjectId
        userId = new mongoose.Types.ObjectId(userId);

        // Find the Workers
        const workers = await Workers.findById(id);
        if (!workers) {
            return res.status(404).json({ success: false, message: "Workers not found" });
        }

        // Remove the previous review from the same user before adding a new one
        workers.reviews = workers.reviews.filter((rev) => rev.userId.toString() !== userId.toString());

        // Add new review
        workers.reviews.push({ userId, fullname, rating, comment });

        // Save the Workers with the updated reviews
        await workers.save({ validateBeforeSave: false });

        return res.status(201).json({
            success: true,
            message: "Review added/updated",
            review: workers.reviews,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all reviews for a Workers
exports.getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const workers = await Workers.findById(id).populate("reviews.userId");
        if (!workers) {
            return res.status(404).json({ success: false, message: "Workers not found" });
        }
        return res.status(200).json({ success: true, reviews: workers.reviews });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Search Workers
exports.searchWorkers = async (req, res) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = (req.query.selectedCuisines || "").split(",").filter((cuisine) => cuisine);
        const query = {};

        if (searchText) {
            query.$or = [
                { WorkersName: { $regex: searchText, $options: "i" } },
                { city: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } },
            ];
        }

        if (searchQuery) {
            query.$or = [
                { WorkersName: { $regex: searchQuery, $options: "i" } },
                { cuisines: { $regex: searchQuery, $options: "i" } },
            ];
        }

        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }

        const workersList = await Workers.find(query);
        return res.status(200).json({ success: true, data: workersList });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get Single Workers
exports.getSingleWorkers = async (req, res) => {
    try {
        const workersId = req.params.id;
        const workers = await Workers.findById(workersId).populate({
            path: "menus",
            options: { sort: { createdAt: -1 } },
        });

        if (!workers) {
            return res.status(404).json({ success: false, message: "Workers not found" });
        }

        return res.status(200).json({ success: true, Workers: workers });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};