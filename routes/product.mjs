import { Router } from 'express';
const router = Router();
export default router;

router.get("/create",      async function(req, res) {
	console.log("product page accessed");
	return res.render('product/create.html');
});

router.get("/view",      async function(req, res) {
	console.log("Viewing product page accessed");
	return res.render('product/view.html');
});

router.get("/update",      async function(req, res) {
	console.log("Updating product page accessed");
	return res.render('product/update.html');
});