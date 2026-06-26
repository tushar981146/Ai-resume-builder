const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const errorHandler = require("./controllers/error.controller")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.frontendUrl,
    credentials: true
}))

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);



app.use((req, res, next) => {

  const err = new CustomError(`can't find this route ${req.originalUrl} on server`, 404);

  next(err)
})



app.use(errorHandler)




module.exports = app