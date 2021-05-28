import { Router } from 'express';
const router = Router();
export default router;

router.get("/createOrders",      async function(req, res) {
	console.log("Create Order page accessed");
	return res.render('orders/createForm.html');
});

router.get("/viewOrders",      async function(req, res) {
	console.log("View Order page accessed");
	return res.render('orders/retrieveForm.html');
});

