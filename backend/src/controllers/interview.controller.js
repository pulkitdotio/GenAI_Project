const { PDFParse } = require('pdf-parse');

const {
    generateInterviewReport: generateInterviewReportService,
    generateResumePDF
} = require('../services/ai.service');

const InterviewReportModel = require('../models/interviewReport.model');
const mongoose = require('mongoose');

async function generateInterviewReport(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: 'Resume PDF is required'
        });
    }

    // Check actual PDF magic bytes.
    const pdfHeader = req.file.buffer
        .subarray(0, 5)
        .toString('ascii');

    if (pdfHeader !== '%PDF-') {
        return res.status(400).json({
            message: 'Invalid PDF file'
        });
    }

    const selfDescription = req.body.selfDescription?.trim();
    const jobDescription = req.body.jobDescription?.trim();

    if (!jobDescription) {
        return res.status(400).json({
            message: 'Job description is required'
        });
    }

    if (!selfDescription) {
        return res.status(400).json({
            message: 'Self description is required'
        });
    }

    let parser;

    try {
        parser = new PDFParse({
            data: req.file.buffer
        });

        const resumeResult = await parser.getText();

        const resumeText = resumeResult.text?.trim();

        if (!resumeText) {
            return res.status(400).json({
                message: 'Could not extract text from the resume PDF'
            });
        }

        const interviewReportByAI =
            await generateInterviewReportService({
                resume: resumeText,
                selfDescription,
                jobDescription
            });

        const interviewReport =
            await InterviewReportModel.create({
                userId: req.user.id,
                resume: resumeText,
                selfDescription,
                jobDescription,
                ...interviewReportByAI
            });

        return res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        });
    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
}

async function getInterviewReportById(req, res) {
    const { interviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
        return res.status(400).json({
            message: 'Invalid interview report ID'
        });
    }

    const interviewReport =
        await InterviewReportModel.findOne({
            _id: interviewId,
            userId: req.user.id
        });

    if (!interviewReport) {
        return res.status(404).json({
            message: 'Interview report not found'
        });
    }

    return res.status(200).json({
        interviewReport
    });
}

async function getAllInterviewReports(req, res) {
    const interviewReports =
        await InterviewReportModel
            .find({
                userId: req.user.id
            })
            .sort({
                createdAt: -1
            })
            .select(
                '-resume -selfDescription -jobDescription -__v'
            );

    return res.status(200).json({
        interviewReports
    });
}

async function generateResumePDFController(req, res) {
    const { interviewReportId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
        return res.status(400).json({
            message: 'Invalid interview report ID'
        });
    }

    const interviewReport =
        await InterviewReportModel.findOne({
            _id: interviewReportId,
            userId: req.user.id
        });

    if (!interviewReport) {
        return res.status(404).json({
            message: 'Interview report not found'
        });
    }

    const {
        resume,
        jobDescription,
        selfDescription
    } = interviewReport;

    const pdfBuffer = await generateResumePDF({
        resume,
        jobDescription,
        selfDescription
    });

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume_${interviewReportId}.pdf"`,
        'Content-Length': pdfBuffer.length
    });

    return res.send(pdfBuffer);
}

module.exports = {
    generateInterviewReport,
    getInterviewReportById,
    getAllInterviewReports,
    generateResumePDFController
};