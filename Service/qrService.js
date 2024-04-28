require('dotenv').config()
const BASE_URL = process.env['SERVER_BASE_URL']
const qr = require('qrcode');
const logger = require('../logger')

exports.generateQr = async (req,res) => {
    try {
        let mobileNumbers = req['query'].mobileNumbers

        let text = BASE_URL + '/api/jkc?mobileNumbers=' + mobileNumbers

        let qrCodeUrl = await generateQRCode(text)

        res.send(`<img src="${qrCodeUrl}" alt="QR Code"/>`)
    } catch (error) {
        logger.error(`Some error occured while generating code! ERR: ${error.message}`)

        res.send(`<h2>Some server error generating QR Code!</h2>`)
    }
}

function generateQRCode (text){
    return new Promise((resolve, reject) => {
      qr.toDataURL(text, (err, url) => {
        if (err) {
            logger.error(`Some error in generating qr code : ERR: ${err.message}`)
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
};