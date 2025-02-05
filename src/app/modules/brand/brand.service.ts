import slugify from 'slugify';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

type TBrandData = {
  name: string;
};

const createBrand = async (brandData: TBrandData) => {
  const alreadyExists = await prisma.brand.findFirst({
    where: {
      name: brandData.name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Category already exists');

  const brand = await prisma.brand.create({
    data: {
      name: brandData.name,
      slug: slugify(brandData.name, {
        lower: true,
      }),
    },
  });

  return brand;
};

const getAllBrands = async () => {
  const brands = await prisma.brand.findMany();

  return brands;
};

export const brandServices = {
  createBrand,
  getAllBrands,
};
