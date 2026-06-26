const pdfParse = require('pdf-parse');
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


async function generateReport(req, res) {

    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

        const { selfDescription, jobDescription } = req.body

        const interviewReportByAI = await generateInterviewReport({
            resume: await resumeContent.text,
            jobDescription,
            selfDescription
        });


        const interviewReport = new interviewReportModel({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,

            title: interviewReportByAI.reportTitle,

            ...interviewReportByAI
        });

        await interviewReport.save();

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (err) {

        console.error(err);

        const code = err?.error?.code || err?.status;

        if (code === 503) {
            return res.status(503).json({
                message:
                    "AI service is busy. Please try again in a few moments."
            });
        }

        if (code === 429) {
            return res.status(429).json({
                message:
                    "Too many requests. Please wait before trying again."
            });
        }

        return res.status(500).json({
            message: "Something went wrong."
        });
    }

}





async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findById({ _id: interviewId, user: req.user.id });

    if (!interviewReport) {
        return res.status(404).json({ message: "Interview report not found" });
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    })

}


async function getAllInterviewReports(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}


async function generateResumePdfController(req, res) {

    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if (!interviewReport) {
        return res.status(404).json({ message: "Interview report not found" });
    };

    const { resume, selfDescription, jobDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
        resume,
        selfDescription,
        jobDescription
    });

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
    });


    res.send(pdfBuffer);

}



module.exports = { generateReport, generateResumePdfController, getInterviewReportByIdController, getAllInterviewReports }