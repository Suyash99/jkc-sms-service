exports.checkMobileNumberValidation = async (req, res, next) => {
    let query = req.query

    if(!query?.mobileNumbers){
        return res.send(`
        <h2>Please Provide mobile number in query to generate QR Code!</h2>`)
    }

    next()
};