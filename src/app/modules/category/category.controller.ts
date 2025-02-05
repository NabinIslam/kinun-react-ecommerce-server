import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { categoryServices } from './category.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryServices.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully!',
      payload: result,
    });
  },
);

export const categoryControllers = {
  createCategory,
};
