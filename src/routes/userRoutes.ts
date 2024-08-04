import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/user', createUser);
router.put('/user/updateUser/:id', updateUser);
router.delete('/user/deleteUser/:id', deleteUser);

router.get('/moderator/getUsers/:id', getUserById);
router.put('/moderator/updateUser/:id', updateUser);
router.delete('/moderator/deleteUser/:id', deleteUser);

router.get('/admin/getUsers', getUsers);
router.get('/admin/getUsers/:id', getUserById);
router.put('/admin/updateUser/:id', updateUser);
router.delete('/admin/deleteUser/:id', deleteUser);

export default router;