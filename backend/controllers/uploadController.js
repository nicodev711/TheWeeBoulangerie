import express from 'express';
import multer from 'multer';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, '../uploads/')); // Specify the correct directory where files will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname)); // Append a unique suffix to the filename to avoid overwriting
    }
});

// Set up multer upload middleware
const upload = multer({ storage: storage }).single('image');

// Serve uploaded files statically
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Define the controller function for handling file uploads
const handleFileUpload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(400).json({ message: err.message });
        }
        console.log({
            filename: req.file.filename,
            url: `http://localhost:3000/uploads/${req.file.filename}`
        })
        // File was uploaded successfully, send response with file information
        res.json({
            filename: req.file.filename,
            url: `http://localhost:3000/uploads/${req.file.filename}`
        });
    });
};
export default handleFileUpload;
