import { Router } from 'express';
const router = Router();
export default router;

router.get("/",      async function(req, res) {
	console.log("Health declaration page accessed");
	return res.render('healthform/createForm.html');
});

router.get("/view",      async function(req, res) {
	console.log("View Health declaration page accessed");
	return res.render('healthform/retrieveForm.html');
});

router.get("/update",      async function(req, res) {
	console.log("Update Health declaration page accessed");
	return res.render('healthform/updateForm.html');
});
