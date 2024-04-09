import mongoose from 'mongoose';

const hoursSchema = new mongoose.Schema({
    Monday: { open: String, close: String },
    Tuesday: { open: String, close: String },
    Wednesday: { open: String, close: String },
    Thursday: { open: String, close: String },
    Friday: { open: String, close: String },
    Saturday: { open: String, close: String },
    Sunday: { open: String, close: String },
}, { timestamps: true });

const Hours = mongoose.model('Hours', hoursSchema);

export default Hours