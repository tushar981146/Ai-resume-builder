const express = require('express');
const {authUser } = require("../middlewares/auth.middleware")
const router = express.Router();
const { generateReport, generateResumePdfController, getInterviewReportByIdController,getAllInterviewReports }= require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
const asyncErrorHandler = require("../utils/asyncError")








router.post('/', authUser, upload.single("resume"), asyncErrorHandler(generateReport))


router.get('/report/:interviewId', authUser, asyncErrorHandler(getInterviewReportByIdController))


router.get('/', authUser, asyncErrorHandler(getAllInterviewReports))

router.post('/resume/pdf/:interviewReportId', authUser, asyncErrorHandler(generateResumePdfController))



module.exports = router;