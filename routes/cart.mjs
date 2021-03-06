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

  const cartList = await ModelCart.findAll({ 
    where : {uuid_cart:req.session.cartid}
  });
  

  const productList = await ModelProduct.findAll();
  
  var total = 0;

  for (var i in productList){
    for (var x in cartList){
      if (cartList[x].uuid_product == productList[i].uuid){
        total += productList[i].price * cartList[x].quantity;
        console.log(i.price);
        console.log(typeof i.price);
      }
    }
  }

  return res.render("cart/viewCart.html", {
    title: "Hello World",
    cartList:cartList,
    productList:productList,
    total: total
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
      uuid_cart: req.session.cartid,
      uuid_product: product.uuid,
    },
  });
  if (item == null) {
    await ModelCart.create({
      uuid_cart: req.session.cartid,
      uuid_product: product.uuid,
      quantity: product.quantity,
    });
  } else {
    item.quantity += product.quantity;
    if (item.quantity <= 0) item.destroy();
    else item.save();
  }
  return res.sendStatus(200).end();

  // return res.render('orders/createForm.html');
});

router.post("/addQuantity", urlencodedParser, async function (req, res){
  console.log("Added Quantity");
  const product = await ModelProduct.findOne({
    where: {
      name: req.body.prodName
    },
  });
  const item = await ModelCart.findOne({
    where: {
      uuid_cart: req.session.cartid,
      uuid_product: product.uuid
  }});
  item.quantity += 1;
  item.update({quantity:item.quantity, where:{
    uuid_cart: req.session.cartid,
    uuid_product: product.uuid
  }})
})

router.post("/removeQuantity", urlencodedParser, async function (req, res){
  console.log("removed Quantity");
  const product = await ModelProduct.findOne({
    where: {
      name: req.body.prodName
    },
  });
  const item = await ModelCart.findOne({
    where: {
      uuid_cart: req.session.cartid,
      uuid_product: product.uuid
    },
  });
  item.quantity -= 1;
  item.update({quantity:item.quantity, where:{
  uuid_cart: req.session.cartid,
  uuid_product: product.uuid
}})})

router.post("/deleteItem", urlencodedParser, async function (req, res){
  console.log("Removing Item");
  const product = await ModelProduct.findOne({
    where: {
      name: req.body.prodName
    },
  });
  await ModelCart.destroy({where : {
    uuid_cart: req.session.cartid,
    uuid_product: product.uuid
  }});
})
