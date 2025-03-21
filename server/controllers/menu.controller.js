const { Request, Response } = require("express");
const uploadImageOnCloudinary = require("../utils/imageUpload");
const Menu = require("../models/menu.model");
const Workers = require("../models/Workers.model");
const mongoose = require("mongoose");

exports.addMenu = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const imageUrl = await uploadImageOnCloudinary(file);
        const menu = await Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });
        const Workers = await Workers.findOne({ user: req.id });
        if (Workers) {
            Workers.menus.push(menu._id);
            await Workers.save();
        }
        return res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.EditWorkerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found!"
            });
        }
        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file);
            menu.image = imageUrl;
        }
        await menu.save();
        return res.status(200).json({
            success: true,
            message: "Menu updated",
            menu
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};