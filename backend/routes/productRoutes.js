import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

// Route to create a new product
router.post('/products', productController.createProduct);

// Route to get all products
router.get('/products', productController.getAllProducts);

// Route to get a product by ID
router.get('/products/:id', productController.getProductById);

// Route to update a product by ID
router.put('/products/:id', productController.updateProduct);

// Route to delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

export default router;
