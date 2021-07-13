import { Router } from 'express';
const router = Router();
export default router;

router.get("/create",     product_page);
router.post("/create",    product_process);

/**
 * Renders the product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function product_page (req, res) {
	console.log("product page accessed");
	return res.render('product/create.html');
}

/**
* Process the login form body
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function product_process(req, res) {
	console.log("product contents received");
	console.log(req.body);
}