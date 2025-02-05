import express from 'express';
import { categoryControllers } from './category.controller';

const router = express.Router();

router.post('/', categoryControllers.createCategory);

export const categoryRoutes = router;
