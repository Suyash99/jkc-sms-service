const app = require('express')
const Router = app.Router()
const {checkMobileNumberValidation} = require('../Service/middlewares')
const {generateQr} = require('../Service/qrService')
const {sendSms} = require('../Service/smsService')

Router.get('/sendSms', checkMobileNumberValidation, sendSms)
Router.get('/generateQr', checkMobileNumberValidation, generateQr)

module.exports = Router