import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/student', createUser);
router.put('/student/updateUser/:id', updateUser);
router.delete('/student/deleteUser/:id', deleteUser);

router.post('/graduatestudent', createUser);
router.put('/graduatestudent/updateUser/:id', updateUser);
router.delete('/graduatestudent/deleteUser/:id', deleteUser);

router.get('/admin/getUsers', getUsers);
router.get('/admin/getUsers/:id', getUserById);
router.put('/admin/updateUser/:id', updateUser);
router.delete('/admin/deleteUser/:id', deleteUser);

export default router;