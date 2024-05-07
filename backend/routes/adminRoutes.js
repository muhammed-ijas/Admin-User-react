import express from 'express';
import { addUser, authAdmin, deleteUser, editUser, getAllUsers, getUser, logoutAdmin, registerAdmin } from "../controllers/adminController.js";
import { adminProtect } from '../middleware/authMiddleware.js';
import imageUpload from '../middleware/multerMiddleware.js';
const router = express.Router()

router.post('/register', registerAdmin)
router.post('/auth', authAdmin)
router.post('/logout', logoutAdmin)
router.get('/getUsers', adminProtect, getAllUsers)
router.delete('/deleteUser', adminProtect, deleteUser);
router.post('/addUser', adminProtect, imageUpload, addUser)
router.put('/editUser', adminProtect, imageUpload, editUser)
router.get("/getUser/:userId", adminProtect, getUser);


export default router