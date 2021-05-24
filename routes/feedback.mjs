import { Router } from 'express';
const router = Router();
export default router;

router.get('/feedback') ,      async function(req, res) {
    res.send('welcome')
}

router.get('/viewFeedback') ,      async function(req, res) {
    res.send('welcome')
}
