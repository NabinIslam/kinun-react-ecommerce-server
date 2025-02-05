import slugify from 'slugify';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

type TCategoryData = {
  name: string;
};

const createCategory = async (categoryData: TCategoryData) => {
  const alreadyExists = await prisma.category.findFirst({
    where: {
      name: categoryData.name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Category already exists');

  const category = await prisma.category.create({
    data: {
      name: categoryData.name,
      slug: slugify(categoryData.name, {
        lower: true,
      }),
    },
  });

  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
};
