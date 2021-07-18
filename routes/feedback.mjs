import { Router } from 'express';
const router = Router();
export default router;



///	After request

//	HOME PAGE of Feedback
router.get("/", async function(req, res) {
	console.log("Feedback page accessed");
	return res.render('feedback/feedback.html', {
		title: "Hello World"
	});
});

router.get("/create", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('feedback/viewFeedback.html', {
		title: "Hello World"
	});
});

router.get("/edit", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('feedback/viewFeedback.html', {
		title: "Hello World"
	});
});