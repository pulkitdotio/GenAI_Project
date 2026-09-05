const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReport(req, res)  {

    const resumeContent = (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const { selfDescription, jobDescription } = req.body;


    const  interviewReportByAI = await generateInterviewReport.generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        userId: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message: 'Interview report generated successfully',
        interviewReport
    })

}














module.exports = { generateInterviewReport };