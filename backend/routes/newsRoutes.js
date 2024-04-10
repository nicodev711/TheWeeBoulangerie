// newsRoutes.js
import express from 'express';
import { getAllNews, createNews, updateNews, updateIsDisplayed, deleteNews } from '../controllers/newsController.js';

const router = express.Router();

// Route to get all news
router.get('/news', getAllNews);

// Route to create new news
router.post('/news', createNews);

// Route to update news
router.put('/news/:id', updateNews);

// Route to update isDisplayed property of news
router.put('/news/:id/isdisplayed', updateIsDisplayed);

// Route to delete news
router.delete('/news/:id', deleteNews);

export default router;
