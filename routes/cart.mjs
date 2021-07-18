import { Router } from 'express';
// import { ModelCart } from '../data/cart';
const router = Router();
export default router;
router.post("/add",      async function(req, res) {
	console.log("Create Order page accessed");

	const item = await ModelCart.findOne({
		where: {
			uuid_user:    req.user.uuid,
			uuid_product: req.body.product,
		}
	});
	if (item == null) {
		await ModelCart.create({
			uuid_user:    req.user.uuid,
			uuid_product: req.body.product,
			quantity:     req.body.qty
		});
	}
	else {
		item.quantity = req.body.qty;
		if (item.quantity <= 0)
			item.destroy();
		else
			item.save();
	}
	return res.sendStatus(200).end();

	// return res.render('orders/createForm.html');
});
