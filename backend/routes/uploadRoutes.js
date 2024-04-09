// uploadRoutes.js

import express from 'express';
import uploadController from '../controllers/uploadController.js';
import fs from 'fs'; // Import the 'fs' module to work with file system

const router = express.Router();

// Define routes for file uploads
router.post('/upload', uploadController);

// Create uploads directory if it doesn't exist
const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

export default router;
