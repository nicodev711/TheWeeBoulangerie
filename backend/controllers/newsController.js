// newsController.js
import News from '../models/News.js';

// Controller function to get all news
export const getAllNews = async (req, res) => {
    try {
        const allNews = await News.find();
        res.json(allNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create new news
export const createNews = async (req, res) => {
    const { title, content, isDisplayed } = req.body;
    const news = new News({ title, content, isDisplayed });

    try {
        const newNews = await news.save();
        res.status(201).json(newNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update news
export const updateNews = async (req, res) => {
    const { id } = req.params; // Assuming you're passing news ID in the URL params
    const { title, content, isDisplayed } = req.body;

    try {
        const updatedNews = await News.findByIdAndUpdate(id, { title, content, isDisplayed }, { new: true });
        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update isDisplayed property of news
export const updateIsDisplayed = async (req, res) => {
    const { id } = req.params; // Assuming you're passing news ID in the URL params
    const { isDisplayed } = req.body;

    try {
        const updatedNews = await News.findByIdAndUpdate(id, { isDisplayed }, { new: true });
        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete news
export const deleteNews = async (req, res) => {
    const { id } = req.params; // Assuming you're passing news ID in the URL params

    try {
        const deletedNews = await News.findByIdAndDelete(id);
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
