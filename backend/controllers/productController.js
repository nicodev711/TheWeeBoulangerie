import Product from '../models/Product.js';

const productController = {
    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error creating product', error });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error updating product', error });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    },

    // New method to update product availability
    updateProductAvailability: async (req, res) => {
        try {
            const { id } = req.params;
            const { available } = req.body;

            const product = await Product.findByIdAndUpdate(id, { available }, { new: true });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error updating product availability', error });
        }
    }
};

export default productController;
