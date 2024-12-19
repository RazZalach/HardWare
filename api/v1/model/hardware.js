const mongoose = require('mongoose');

const HardwareCategories = [
    "Processor", 
    "Motherboard", 
    "Graphics Card", 
    "RAM", 
    "Power Supply", 
    "Internal Storage", 
    "Hard Drive"
];
mongoose.pluralize(null);

const HardwareSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        type: String,
        enum: HardwareCategories,
        required: [true, 'Category is required']
    },
    name: {
        type: String,
        required: [true, 'Hardware name is required'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: [500, 'Description must not exceed 500 characters']
    },
    picUrl: {
        type: String,
        required: [true, 'Picture URL is required'],
    },
    yearProd: {
        type: Number,
        required: [true, 'Year of production is required'],
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    }
}, { timestamps: true });

module.exports = mongoose.model("Hardware", HardwareSchema);
