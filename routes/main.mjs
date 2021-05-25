import { Router } from 'express';

const router = Router();
export default router;

// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});

// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs'
router.use("/auth", RouterAuth);

import RouterFeedback from './feedback.mjs'
router.use('/feedback', RouterFeedback)

import RouterProduct from './product.mjs'
router.use('/product', RouterProduct)

// ---------------- 
//	TODO:	Common URL paths here
router.get("/",      async function(req, res) {
	console.log("Home page accessed");
	return res.render('index.html', {
		title: "Hello  Not Today"
	});
});

router.get("/about", async function(req, res) {
	console.log("About page accessed");
	return res.render('about.html', {
		author: "The awesome programmer",
		values: [1, 2, 3, 4, 5, 6]
	});
});

router.get("/feedback", async function(req, res) {
	console.log("Feedback page accessed");
	return res.render('../templates/feedback/feedback.html', {
		title: "Hello World"
	});
});

router.get("/viewFeedback", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('../templates/feedback/viewFeedback.html', {
		title: "Hello World"
	});
});

router.get("/product", async function(req, res) {
	console.log("product page accessed");
	return res.render('../templates/product/product.html', {
		title: "Hello World"
	});
});

router.get("/viewProduct", async function(req, res) {
	console.log("View Product page accessed");
	return res.render('../templates/product/viewProduct.html', {
		title: "Hello World"
	});
});