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

export const productControllers = {
  createProduct,
};
