import { Request } from 'express';
import prisma from '../../../shared/prisma';
import slugify from 'slugify';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { ICloudinaryResponse } from '../../../interfaces/file';

const createProduct = async (req: Request) => {
  const alreadyExists = await prisma.product.findFirst({
    where: {
      name: req.body.name,
    },
  });

  if (alreadyExists)
    throw new ApiError(httpStatus.CONFLICT, 'Product already exists');

  // Ensure files are uploaded
  if (!req.files || (req.files as Express.Multer.File[]).length === 0)
    throw new ApiError(400, 'At least one image is required');

  const uploadedFiles = req.files as Express.Multer.File[];

  // Upload each image to Cloudinary
  const uploadPromises = uploadedFiles.map(file =>
    FileUploadHelper.uploadToCloudinary(file),
  );

  // Wait for all images to be uploaded
  const uploadedImages = await Promise.all(uploadPromises);

  // Filter out failed uploads (undefined URLs)
  const imageUrls = uploadedImages
    .filter((image): image is ICloudinaryResponse => image !== undefined)
    .map(image => ({
      url: image.secure_url, // Ensure only valid strings
    }));

  // Check if there are valid images before saving
  if (imageUrls.length === 0) throw new ApiError(400, 'Image upload failed');

  // Create the product in the database
  const product = await prisma.product.create({
    data: {
      ...req.body,
      slug: slugify(req.body.name, { lower: true }),
      price: parseFloat(req.body.price),
      images: { create: imageUrls }, // Save images in relation
    },

    include: { images: true, category: true, brand: true },
  });

  return product;
};

export const productServices = {
  createProduct,
};
