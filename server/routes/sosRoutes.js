import express from 'express';
import { createSOSRequest } from '../controllers/sosController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // you'll create this
import { getAllSOSRequests } from '../controllers/sosController.js';
import { updateSOSStatus } from '../controllers/sosController.js';

const router = express.Router();

// POST /api/sos
router.post('/create', authMiddleware, createSOSRequest);

router.get('/', authMiddleware, getAllSOSRequests);

router.put('/:id/status', authMiddleware, updateSOSStatus);


export default router;
