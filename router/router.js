import express from 'express';
const router = express.Router();
import {signup} from './controller/controller.js'
router.post('/', signup);

export default router;