import { Router } from 'express';
const router = Router();
export default router;
import {ModelOrders} from "../data/orders.mjs"

router.get("/create",     orders_page);
router.post("/create",    orders_process);

/**
 * Renders the product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function orders_page (req, res) {
	console.log("Orders page accessed");
	return res.render('orders/create.html');
}

/**
* Process the login form body
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function orders_process(req, res) {
	console.log("Orders contents received");
	console.log(req.body.bdate);
	await ModelOrders.create({
		orderID:req.body.orderID,
		prodID:req.body.prodID,
		prodName:req.body.prodName,
		quantity:req.body.quantity,
		supp:req.body.supp,
		time:req.body.time,
		bdate:req.body.bdate,
		metod:req.body.metod

	});
	return res.redirect("/");
}

router.get("/view", view_orders);
async function view_orders(req, res){
	var ordlist= await ModelOrders.findAll();
	return res.render("orders/view.html", {ordlist:ordlist});
}