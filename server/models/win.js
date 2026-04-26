import mongoose from "mongoose";

const winSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    difficulty: { 
        type: Number, 
        min: 1, 
        max: 5,
        default: 3
    },
    category: {
        type: String,
        enum: ['Work', 'Fitness', 'Personal', 'Social', 'Other'], 
        default: 'Personal'
    }
}, {timestamps: true});

const Win = mongoose.model('Win',winSchema);

export default Win;