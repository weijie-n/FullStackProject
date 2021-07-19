import { Router } from 'express';
const router = Router();
export default router;

router.get("/create",     orders_page);
router.post("/create",    orders_process);

/**
 * Renders the product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function orders_page (req, res) {
	console.log("Orders page accessed");
	return res.render('orders/create.html');np
}

/**
* Process the login form body
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function orders_process(req, res) {
	console.log("orders contents received");
	console.log(req.body);
}