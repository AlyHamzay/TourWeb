import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', verifyUser, createBooking); // Protect the booking endpoint
router.get('/:id', verifyUser, getBooking); // Protect the booking endpoint
router.get('/', verifyUser, getAllBooking); // Protect the booking endpoint
export default router;
