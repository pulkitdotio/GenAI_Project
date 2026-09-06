const pdfParse = require('pdf-parse');
const {generateInterviewReport: generateInterviewReportService, generateResumePDF} = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewReport.model');
const { PDFParse } = require('pdf-parse');

async function generateInterviewReport(req, res)  {

    if(!req.file){
        return res.status(400).json({
            message: "Resume PDF is required"
        });
    }

    const parser = new PDFParse({
        data: req.file.buffer
    });

    const resumeContent = await parser.getText();

    const { selfDescription, jobDescription } = req.body;


    const  interviewReportByAI = await generateInterviewReportService({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await InterviewReportModel.create({
        userId: req.user.id,
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




async function getInterviewReportById(req, res) {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, userId: req.user.id });

    if (!interviewReport) {
        return res.status(404).json({ message: 'Interview report not found' });
    }

    res.status(200).json({ interviewReport });
}



async function getAllInterviewReports(req, res) {
    const interviewReports = await InterviewReportModel.find({ userId: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    res.status(200).json({ interviewReports });
}



async function generateResumePDFController(req,res){
    const { interviewReportId } = req.params
    const interviewReport = await InterviewReportModel.findOne({_id: interviewReportId, userId: req.user.id})

    if (!interviewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePDF({resume, jobDescription, selfDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Description": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)

}





module.exports = { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDFController };