// import { urlencoded } from 'body-parser';
import BodyParser from 'body-parser';
var urlencodedParser = BodyParser.urlencoded({ extended: false });
import { Router } from 'express';
import { ModelInvoice } from '../data/invoice.mjs';
const router = Router();
export default router;

router.get("/", async function (req, res) {
    console.log("Invoice page accessed");
    
    const invoiceList = await ModelInvoice.findAll();


    return res.render('invoice/viewInvoice.html',{
        invoiceList:invoiceList
    });
});

router.get("/create", async function (req, res) {
    console.log("Display invoice page accessed");
    return res.render('invoice/createinvoice.html');
});

router.get("/fullInvoice", async function (req, res){
    console.log("Full Invoice page accessed");

    const invoiceList = await ModelInvoice.findAll();

    return res.render('invoice/Invoice.html',{
        invoiceList:invoiceList
    });
})

router.post("/deleteInvoice", urlencodedParser, async function (req, res){
    console.log("Removing Invoice");
    // const invoice = await ModelInvoice.findOne({
    //     where:{
    //         name: req.body.invoiceName
    //     }
    // });
    await ModelInvoice.destroy({where:{
        uuid:req.body.invoiceName
    }})
})