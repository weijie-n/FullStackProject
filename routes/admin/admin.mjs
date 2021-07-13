import { Router } from 'express';
const router = Router();
export default router;

import RouterFeedback from './feedback.mjs';
router.use('/feedback', RouterFeedback);