import { Router } from 'express';
const router = Router();
export default router;


router.get("/product", async function(req, res) {
	console.log("product page accessed");
	return res.render('product/product.html', {
		title: "Hello World"
	});
});

router.get("/viewProduct", async function(req, res) {
	console.log("View Product page accessed");
	return res.render('product/viewProduct.html', {
		title: "Hello World"
	});
});
