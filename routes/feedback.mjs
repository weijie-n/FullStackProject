import { Router } from 'express';
const router = Router();
export default router;

router.get("/feedback", async function(req, res) {
	console.log("Feedback page accessed");
	return res.render('../templates/feedback/feedback.html', {
		title: "Hello World"
	});
});

router.get("/viewFeedback", async function(req, res) {
	console.log("View Feedback page accessed");
	return res.render('../templates/feedback/viewFeedback.html', {
		title: "Hello World"
	});
});