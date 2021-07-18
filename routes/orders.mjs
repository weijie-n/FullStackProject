import { Router } from 'express';
// import { ModelCart } from '../data/cart';
const router = Router();
export default router;

router.get("/",      async function(req, res) {
	console.log("Create Order page accessed");
	return res.render('orders/createForm.html');
});

router.get("/view",      async function(req, res) {
	console.log("View Order page accessed");
	return res.render('orders/retrieveForm.html', {
		products: [
			{ product: null, qty: 0 }
		]
	});
});





