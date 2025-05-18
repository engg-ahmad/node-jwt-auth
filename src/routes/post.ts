import { Router } from 'express';

import middleware from '../middleware';
import postApi from '../api/post';

const router = Router();

router.get(
  '/',
  middleware.jwtCheck,
  postApi.getPosts,
);

router.post(
  '/create',
  middleware.jwtCheck,
  postApi.createPost,
);

router.put(
  '/:id',
  middleware.jwtCheck,
  postApi.updatePost,
);

router.delete(
  '/:id',
  middleware.jwtCheck,
  postApi.deletePost,
);

export default router;