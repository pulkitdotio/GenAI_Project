const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');

const interviewRouter = express.Router();



interviewRouter.post("/", authMiddleware, upload.single('resume'), interviewController.generateInterviewReport);



interviewRouter.get("/report/:interviewId", authMiddleware, interviewController.getInterviewReportById);



interviewRouter.get("/", authMiddleware, interviewController.getAllInterviewReports);





module.exports = interviewRouter;