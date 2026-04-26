import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Win from './models/win.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas successfully');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });


app.post('/api/win', async (req, res) => {
    try {
        const { title, description, difficulty, category } = req.body;

        const newWin = new Win({
            title,
            description,
            difficulty,
            category,
        });
        const savedWin = await newWin.save();

        res.status(201).json(savedWin);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
app.get('/api/win', async (req, res) => {
    try {
        const wins = await Win.find().sort({ date: -1 });
        res.json(wins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.delete('/api/win/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWin = await Win.findByIdAndDelete(id);

        if (!deletedWin) {
            return res.status(404).json({ message: 'Win not found' });
        }

        res.json({ message: 'Win deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.patch('/api/win/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedWin = await Win.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        })

        if (!updatedWin) {
            return res.status(404).json({ message: 'Win not found' });
        }

        res.json(updatedWin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.listen(PORT, () => {
    console.log(`Server is flying on http://localhost:${PORT}`)
});