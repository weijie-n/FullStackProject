import { Router } from 'express';
const router = Router();
export default router;

router.get('/product') ,      async function(req, res) {
    res.send('welcome')
}

router.get('/viewProduct') ,      async function(req, res) {
    res.send('welcome')
}
