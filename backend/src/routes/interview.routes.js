const express = require('express');
const {authUser } = require("../middlewares/auth.middleware")
const router = express.Router();
const { generateReport, generateResumePdfController, getInterviewReportByIdController,getAllInterviewReports }= require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")









router.post('/', authUser, upload.single("resume"), generateReport)


router.get('/report/:interviewId', authUser, getInterviewReportByIdController)


router.get('/', authUser, getAllInterviewReports)

router.post('/resume/pdf/:interviewReportId', authUser, generateResumePdfController)



module.exports = router;