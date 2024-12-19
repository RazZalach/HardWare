const mongoose = require('mongoose');
const Hardware = require('../model/hardware');

module.exports = {

    createHardware: async (req, res) => {
        try {
            const hardwareData = req.body;
            const newHardware = new Hardware({
                _id: new mongoose.Types.ObjectId(),
                ...hardwareData,
            });
            await newHardware.save();
            res.status(201).json({ message: 'Hardware created successfully', hardware: newHardware });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getHardware: async (req, res) => {
        try {
            const hardwareItems = await Hardware.find();
            res.status(200).json(hardwareItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getHardwareByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const hardwareItems = await Hardware.find({ category });
            res.status(200).json(hardwareItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateHardware: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedHardware = await Hardware.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedHardware) {
                return res.status(404).json({ message: 'Hardware not found' });
            }
            res.status(200).json({ message: 'Hardware updated successfully', hardware: updatedHardware });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteHardware: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedHardware = await Hardware.findByIdAndDelete(id);
            if (!deletedHardware) {
                return res.status(404).json({ message: 'Hardware not found' });
            }
            res.status(200).json({ message: 'Hardware deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    filterHardware: async (req, res) => {
        try {
            const { minPrice, maxPrice, minYear, maxYear } = req.query;
            const filters = {};

            if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
            if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
            if (minYear) filters.yearProd = { $gte: parseInt(minYear) };
            if (maxYear) filters.yearProd = { ...filters.yearProd, $lte: parseInt(maxYear) };

            const hardwareItems = await Hardware.find(filters);
            res.status(200).json(hardwareItems);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getHardwareByCompany: async (req, res) => {
        try {
            const { company } = req.query;
            const hardwareItems = await Hardware.find({ company });
            res.status(200).json(hardwareItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getTop5HardwareByPrice: async (req, res) => {
        try {
            const hardwareItems = await Hardware.find().sort({ price: -1 }).limit(5);
            res.status(200).json(hardwareItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
