import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { brandServices } from './brand.service';

const createBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await brandServices.createBrand(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brand created successfully!',
      payload: result,
    });
  },
);

const getAllBrands = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await brandServices.getAllBrands();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Brands retrieved successfully',
      payload: result,
    });
  },
);

export const brandController = {
  createBrand,
  getAllBrands,
};
