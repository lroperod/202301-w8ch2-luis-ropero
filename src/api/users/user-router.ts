import registerValidation from './user-validation.js';
import express from 'express';
import {
  updateUserByIdController,
  getUserByIdController,
} from './user-controller.js';
import { validate } from 'express-validation';

const router = express.Router();

router
  .route('/:id/')
  .put(validate(registerValidation), updateUserByIdController);
router.route('/:id/').get(getUserByIdController);
export default router;
