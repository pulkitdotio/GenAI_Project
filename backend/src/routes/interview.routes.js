const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');

const interviewRouter = express.Router();



interviewRouter.post("/", authMiddleware, upload.single('resume'), interviewController.generateInterviewReport);




module.exports = interviewRouter;