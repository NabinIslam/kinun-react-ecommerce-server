import express from 'express';
import { brandController } from './brand.controller';

const router = express.Router();

router.post('/', brandController.createBrand);
router.get('/', brandController.getAllBrands);

export const brandRoutes = router;
