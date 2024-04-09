import express from 'express';
const router = express.Router();
import { getHours, addHours, updateHours, deleteHours } from '../controllers/hoursController.js';


// Get opening hours
router.get('/hours', getHours);

// Add opening hours
router.post('/hours', addHours);

// Update opening hours
router.put('/hours/:id', updateHours);

// Delete opening hours
router.delete('/hours/:id', deleteHours);

export default router;
