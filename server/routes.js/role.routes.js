import express from 'express';
import { searchRoles } from '../controllers/role.controller.js';

const router = express.Router();

router.get('/search', searchRoles);

export default router;