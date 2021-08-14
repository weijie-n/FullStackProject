import { Router } from "express";

const router = Router();
export default router;

// ----------------
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {
  return res.sendFile(`./dynamic/${req.params.path}`);
});

//	Before request
async function ensure_login(req, res, next) {
  if (req.user == undefined) return res.redirect("/auth/login");
  else next();
}

async function ensure_admin(req, res, next) {
  if (req.user.role != "Admin") return res.sendStatus(403);
  else return next();
}

// ----------------
//	TODO: Attach additional routers here
import RouterAuth from "./auth.mjs";
router.use("/auth", RouterAuth);

//	For Logged in + Being Admin
import RouterAdmin from "./admin/admin.mjs";
router.use("/admin", ensure_login, ensure_admin, RouterAdmin);

//	For Logged in only
import RouterUser from "./user/user.mjs";
router.use("/user", ensure_login, RouterUser);

//	Any tom dick and harry
import RouterFeedback from "./feedback.mjs";
router.use("/feedback", RouterFeedback);

import RouterInvoice from "./invoice.mjs";
router.use("/invoice", RouterInvoice);

import RouterProduct from "./product.mjs";
router.use("/product", RouterProduct);

import RouterOrder from "./orders.mjs";
router.use("/orders", RouterOrder);

import RouterCart from "./cart.mjs";
import { ModelProduct } from "../data/product.mjs";
router.use("/cart", RouterCart);

// ----------------
//	TODO:	Common URL paths here
router.get("/", async function (req, res) {
  console.log("Home page accessed");
  return res.redirect("/home");
});

router.post("/contactUs", async function(req,res) {
  //store into sql
  req.session.contact = true;
  return res.redirect("/");


})
router.get("/home", async function (req, res) {
  console.log("Home page accessed");
  res.render("index.html", {
    contact: req.session.contact
  });
  req.session.contact = false;
});

router.get("/about", async function (req, res) {
  console.log("About page accessed");
  return res.render("about.html", {
    author: "The awesome programmer",
    values: [1, 2, 3, 4, 5, 6],
  });


});


