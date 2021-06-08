import { Router } from 'express';
const router = Router();
export default router;

//	Before request
router.use(async function(req, res, next) {
	if (req.user == undefined)
		return res.redirect("/auth/login");
	else
		next();
});

router.use(async function(req, res, next) {
	if (req.user.role != "Admin")
		return res.sendStatus(403);
	else
		return next();
});


///	After request

//	HOME PAGE of Feedback
router.get("/", async function(req, res) {
	console.log("Feedback page accessed");
	return res.render('../templates/feedback/feedback.html', {
		title: "Hello World"
	});
});

router.post("/create", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('../templates/feedback/viewFeedback.html', {
		title: "Hello World"
	});
});

router.post("/edit", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('../templates/feedback/viewFeedback.html', {
		title: "Hello World"
	});
});