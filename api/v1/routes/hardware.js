const express = require('express');
const router = express.Router();

const { 
    createHardware, 
    getHardware, 
    getHardwareByCategory, 
    updateHardware, 
    deleteHardware, 
    filterHardware, 
    getHardwareByCompany, 
    getTop5HardwareByPrice 
} = require('../controller/hardware');

// Define routes
router.post('/create', createHardware); // Create a new hardware item
router.get('/', getHardware); // Get all hardware items
router.get('/category/:category', getHardwareByCategory); // Get hardware by category
router.put('/update/:id', updateHardware); // Update a hardware item by ID
router.delete('/delete/:id', deleteHardware); // Delete a hardware item by ID
router.get('/filter', filterHardware); // Filter hardware by price and year
router.get('/company', getHardwareByCompany); // Get hardware by company
router.get('/top5', getTop5HardwareByPrice); // Get top 5 hardware items by price

module.exports = router;
