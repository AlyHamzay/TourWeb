 import express from 'express';
 import { updateUser, deleteUser, getSingleUser, getAllUsers } from '../controllers/userController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();
 //Update the user
 
 router.put('/:id',verifyUser, updateUser);
 //Delete  user
 
 router.delete('/:id',verifyUser, deleteUser);
 //get single user
 
 router.get('/:id', verifyUser, getSingleUser);
 //get All user

 router.get('/:id', verifyAdmin, getAllUsers);
 export default router;