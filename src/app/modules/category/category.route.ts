import express from 'express';
import { categoryControllers } from './category.controller';

const router = express.Router();

router.post('/', categoryControllers.createCategory);
router.get('/', categoryControllers.getAllCategories);

export const categoryRoutes = router;
