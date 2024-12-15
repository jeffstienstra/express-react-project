import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:_id', userController.updateUser);
router.delete('/:name', userController.deleteUser);

export default router;