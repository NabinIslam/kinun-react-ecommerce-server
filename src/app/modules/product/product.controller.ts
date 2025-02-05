import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { productServices } from './product.service';
import httpStatus from 'http-status';

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await productServices.createProduct(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product created successfully!',
      payload: result,
    });
  },
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search, category, brand } = req.query;

    const result = await productServices.getAllProducts({
      search: search as string,
      category: category as string,
      brand: brand as string,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully!',
      payload: result,
    });
  },
);

export const productControllers = {
  createProduct,
  getAllProducts,
};
