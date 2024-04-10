// newsModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDisplayed: {
        type:Boolean,
        default:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const News = model('News', newsSchema);

export default News;
