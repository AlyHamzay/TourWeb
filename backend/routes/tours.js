import express from 'express';
import { createTour, updateTour,deleteTour, getSinglTour, getAllTour, getTourBySearch, getFeaturedTour, getTourCount } from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//create new tour

router.post('/', verifyAdmin, createTour);
//Update the tour

router.put('/:id', verifyAdmin,  updateTour);
//Delete  tour

router.delete('/:id', verifyAdmin, deleteTour);
//get single tour

router.get('/:id',  getSinglTour);
//get All tour

router.get('/', getAllTour);

//get tour by search
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTour', getFeaturedTour);
router.get('/search/getTourCount', getTourCount);

//export the router module

export default router;
