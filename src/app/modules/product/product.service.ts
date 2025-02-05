import { Request } from 'express';

const createProduct = async (req: Request) => {
  console.log(req.body);
};

export const productServices = {
  createProduct,
};
