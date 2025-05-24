import express from 'express';
import { createProduct, updateProduct, deleteProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/', getProducts)

export default router;