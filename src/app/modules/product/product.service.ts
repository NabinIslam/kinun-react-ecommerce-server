import { Request } from 'express';
import prisma from '../../../shared/prisma';
import slugify from 'slugify';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { ICloudinaryResponse } from '../../../interfaces/file';

const createProduct = async (req: Request) => {
  const { name, description, short_description, price, categoryId, brandId } =
    req.body;

  const alreadyExists = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Product already exists');

  const uploadedFiles = req.files as Express.Multer.File[];

  // Upload each image to Cloudinary
  const uploadPromises = uploadedFiles.map(file =>
    FileUploadHelper.uploadToCloudinary(file),
  );

  // Wait for all images to be uploaded
  const uploadedImages: (ICloudinaryResponse | undefined)[] =
    await Promise.all(uploadPromises);

  // Extract image URLs
  const imageUrls = uploadedImages.map(image => ({
    url: image?.secure_url, // Cloudinary returns secure_url
  }));

  // Create the product in the database
  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name, { lower: true }),
      description,
      short_description,
      price: parseFloat(price),
      images: { create: imageUrls }, // Save images in relation
      categoryId,
      brandId,
    },

    include: { images: true, category: true, brand: true },
  });

  return product;
};

export const productServices = {
  createProduct,
};
