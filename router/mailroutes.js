import express from 'express'
import {sendMail} from '../controller/mailcontroller.js'

const mailRouter = express.Router()

mailRouter.route('/')
.post(sendMail)

export default mailRouter;