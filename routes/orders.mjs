import { Router } from 'express';
const router = Router();
export default router;

router.get("/orders",      async function(req, res) {
	console.log("Create order page accessed");
	return res.render('orders/createOrders.html');
});

router.get("/vieworders",      async function(req, res) {
	console.log("Orders page accessed");
	return res.render('orders/viewOrder.html');
});

