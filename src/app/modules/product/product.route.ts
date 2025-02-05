import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { productControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  FileUploadHelper.upload.array('images', 5),
  productControllers.createProduct,
);

export const productRoutes = router;
