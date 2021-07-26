import BodyParser from 'body-parser';
var urlencodedParser = BodyParser.urlencoded({ extended: false });
import { Router } from "express";
// import { Model } from "sequelize/types";
import { ModelProduct } from "../data/product.mjs";
import { ModelCart } from '../data/cart.mjs';
const router = Router();
export default router;

router.get("/", async function (req, res) {
  console.log("Create Cart page accessed");

  const productList = await ModelProduct.findAll();
  
  return res.render("cart/testing.html", {
    title: "Hello World",
    productList:productList

  });
});

router.get("/view", async function (req, res) {
  console.log("View Cart page accessed");
  return res.render("cart/viewCart.html", {
    title: "Hello World",
  });
});

router.post("/add", urlencodedParser, async function (req, res) {
  console.log("Create Order page accessed");

  console.log(req.body)

  const product = await ModelProduct.findOne({
      where: {
        name: req.body.prodName
      },
    });

  const item = await ModelCart.findOne({
    where: {
      //uuid_user: req.user.uuid,
      uuid_product: product.uuid,
    },
  });
  if (item == null) {
    await ModelCart.create({
      //uuid_user: req.user.uuid,
      uuid_product: product.uuid,
      quantity: product.quantity,
    });
  } else {
    item.quantity = product.quantity;
    if (item.quantity <= 0) item.destroy();
    else item.save();
  }
  return res.sendStatus(200).end();

  // return res.render('orders/createForm.html');
});
