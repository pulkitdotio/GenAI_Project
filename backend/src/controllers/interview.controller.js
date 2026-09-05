const pdfParse = require('pdf-parse');
const {generateInterviewReport, generateResumePDF} = require('../services/ai.service');
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




async function getInterviewReportById(req, res) {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, userId: req.user._id });

    if (!interviewReport) {
        return res.status(404).json({ message: 'Interview report not found' });
    }

    res.status(200).json({ interviewReport });
}



async function getAllInterviewReports(req, res) {
    const interviewReports = await InterviewReportModel.find({ userId: req.user._id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    res.status(200).json({ interviewReports });
}



async function generateResumePDFController(req,res){
    const { interviewReportId } = req.params
    const interviewReport = await InterviewReportModel.findById(interviewReportId)

    if (!interviewReportId){
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