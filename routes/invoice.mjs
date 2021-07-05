import { Router } from 'express';
const router = Router();
export default router;

router.get("/", async function (req, res) {
    console.log("Invoice page accessed");
    return res.render('invoice/createForm.html');
});

router.get("/view", async function (req, res) {
    console.log("Display invoice page accessed");
    return res.render('invoice/retrieveForm.html');
});
