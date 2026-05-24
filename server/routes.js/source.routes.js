import express from 'express';
import { searchSources } from '../controllers/source.controller.js';

const router = express.Router();

router.get('/search', searchSources);

export default router;