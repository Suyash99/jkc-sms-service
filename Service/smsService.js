const logger = require('../logger')
const fs = require('fs')

exports.sendSms = async(req,res) => {
    try {
        let query = req['query']

        let mobileNumbers = query['mobileNumbers']
        let smsContent = query['smsContent'] ?? 'Dear Team, The concerned security personel has reached your location. Please be ready and cooperative for the checking'

        let sendSmsResponse = await generateSms(mobileNumbers,smsContent)
        // let sendSmsResponse = await smsSenderFile(mobileNumbers,messageBody)
        
        logger.info(`SMS Response- ${JSON.stringify(sendSmsResponse)}`)

        if(sendSmsResponse){
            return res.status(200).json({'message': 'Message sent successfully', 'status':200})
        } else {
            return res.status(400).json({'error': 'Message not sent! Please contact Backend administrator!', 'status':400})
        }
    } catch (error) {
        logger.error(`Some error in sending sms- ${error.message}`)

        return res.status(500).json({error:`Server error : ${error.message}`, status:500})
    }
}

async function generateSms(mobileNumbers, smsContent){
    let smsContentExecutionCodeBody = fs.readFileSync('./Service/smsSenderFile.js', 'utf-8')

    let functionPrefix = `async function _f(){
        let mobileNumbers = "91${mobileNumbers}";
        let smsContent = "${smsContent}";
    `

    let functionPostFix = `} _f().then(e => {
        if(e) return e
        else return 'Done'
    }).catch(err => {
        throw new Error(err.message)
    })`

    let wholeTerm = functionPrefix+ smsContentExecutionCodeBody + functionPostFix

    return await eval(wholeTerm)

    /**
     *  try {
        let options = {
            method:method,
            url:url,
            headers:headers
        }

        if(body) {
            options['data'] = body
            options['maxBodyLength'] = Infinity
        }

        return axios.request(options)
        .then(e => {
            return e.data
        })
        .catch(err => {throw new Error(err)})
        } catch (error) {
            logger.error(`Catched error in making request! Method- ${method}, url - ${url} : ERR : ${error}`)

            throw new Error(error.message)
        }
     */
}