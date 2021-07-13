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

/*

router.get("/view",      async function(req, res) {
	console.log("Viewing product page accessed");
	return res.render('product/view.html');
});

router.get("/update",      async function(req, res) {
	console.log("Updating product page accessed");
	return res.render('product/update.html');
});

*/