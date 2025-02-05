import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/admin/admin.route';
import { MetaRoutes } from '../modules/meta/meta.routes';
import { MeilisearchRoutes } from '../modules/meilisearch/meilisearch.route';
import { categoryRoutes } from '../modules/category/category.route';
import { brandRoutes } from '../modules/brand/brand.route';
import { productRoutes } from '../modules/product/product.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/metadata',
    route: MetaRoutes,
  },
  {
    path: '/search-doctors',
    route: MeilisearchRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/brands',
    route: brandRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
