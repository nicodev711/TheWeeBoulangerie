import Hours from '../models/Hours.js';

// Get opening hours
export const getHours = async (req, res) => {
    try {
        const hours = await Hours.find();
        res.json(hours);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update opening hours
export const updateHours = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHours = await Hours.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedHours);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Add new opening hours
export const addHours = async (req, res) => {
    try {
        const newHours = new Hours(req.body);
        await newHours.save();
        res.status(201).json(newHours);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete opening hours
export const deleteHours = async (req, res) => {
    try {
        const { id } = req.params;
        await Hours.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
