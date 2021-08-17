import BodyParser from 'body-parser';
import pkg from 'sequelize';
const {Op} = pkg;
var urlencodedParser = BodyParser.urlencoded({ extended: false });
import { Router } from 'express';
import { ModelProduct } from "../data/product.mjs";
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
* Process the product body
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function product_process(req, res) {
	console.log("product contents received");
	console.log(req.body);
	// store into sql
	await ModelProduct.create({
		name: req.body.name,
		price: req.body.price,
      quantity: req.body.quantity,
	  remarks: req.body.remarks,
	  resImgUrl: req.body.file
	})
	return res.redirect("/product/view")
}

router.get("/view",     Vproduct_page);


/**
 * Renders the view product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function Vproduct_page (req, res) {
	
const productList = await ModelProduct.findAll();
	console.log("view product page accessed");
	return res.render('product/view.html', {productList:productList});
}

router.get("/update",     Uproduct_page);
router.post("/update",    Uproduct_process);

/**
 * Renders the update product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function Uproduct_page (req, res) {
	console.log("update product page accessed");
	var up = await ModelProduct.findOne({where : {name:req.query.prodName}});
	return res.render('product/update.html', {name: up.name,
		price: up.price,
	  resImgUrl: up.file});
}

/**
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function Uproduct_process(req, res) {
	console.log("update product contents received");
	console.log(req.body);
await ModelProduct.update(
		{ quantity: req.body.quantity, remarks: req.body.remarks},
		{ where: { name: req.body.name } }
	  )
	return res.redirect("/product/view")
}

router.post("/delete",    Dproduct_process);

/**
 * Renders the delete product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function Dproduct_process (req, res) {
	console.log("delete product page accessed");
	await ModelProduct.destroy({where : {name:req.body.name}});
	return res.redirect("/product/view");
}
router.get("/low",     Lproduct_page);


/**
 * Renders the view low quantity product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function Lproduct_page (req, res) {
	
const productList = await ModelProduct.findAll({where :{quantity:{[Op.lt]:10}}});
	console.log("view low quantity product page accessed");
	return res.render('product/low.html', {productList:productList});
}
router.get("/sortBy/low_to_high",     LtHproduct_page);

/**
 * Renders the view low to high quantity product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function LtHproduct_page (req, res) {
const productList = await ModelProduct.findAll({order:[['quantity', 'ASC']]});
	console.log("view low to high quantity product page accessed");
	return res.render('product/view.html', {productList:productList});
}
router.get("/sortBy/high_to_low",     HtLproduct_page);

/**
 * Renders the view high to low quantity product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function HtLproduct_page (req, res) {
const productList = await ModelProduct.findAll({order:[['quantity', 'DESC']]});
	console.log("view high to low quantity product page accessed");
	return res.render('product/view.html', {productList:productList});
}
router.post("/search",    Sproduct_process);

/**
 * Renders the search product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function Sproduct_process (req, res) {
	console.log("search product page accessed");
	console.log(req.body);
	const productList = await ModelProduct.findAll({where :{name:{[Op.like]: '%'+req.body.search+'%'}}});
	return res.render('product/view.html', {productList:productList});
}