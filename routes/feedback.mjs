import { Router } from 'express';
const router = Router();
export default router;

router.get("/create",     feedback_page);
router.post("/create",    feedback_process);

/**
 * Renders the product page
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */

async function feedback_page (req, res) {
	console.log("Feedback page accessed");
	return res.render('feedback/create.html');
}

/**
* Process the login form body
 * @param {import('express').Request}  req Express Request handle
 * @param {import('express').Response} res Express Response handle
 */
async function feedback_process(req, res) {
	console.log("Feedback contents received");
	console.log(req.body);
}