import { Router } from "express";
import {
    getAllProductsController,
    getProductByIdController,
    createProductController,
    deleteProductController, 
    updateProductController,
    createProductMockController,
   
} from '../controllers/productsController.js'
import { isAdmin } from "../middlewares/authVerification.js";

const router = Router();
router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);
router.post('/', isAdmin, createProductController);
router.put('/:id',isAdmin, updateProductController);
router.delete('/:id', isAdmin,deleteProductController);
router.post('/mockingproducts', createProductMockController)


export default router;