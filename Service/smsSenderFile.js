require("dotenv").config();
const authKey = process.env["TWILO_AUTH_KEY"];
const accountSid = process.env["ACCOUNT_SID"];
const axios = require("axios");
const qs = require("qs");

let data = qs.stringify({
  To: mobileNumbers,
  From: "14156882467",
  Body: smsContent,
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url:
    "https://api.twilio.com/2010-04-01/Accounts/" +
    accountSid +
    "/Messages.json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: authKey,
  },
  data: data,
};

return axios
  .request(config)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error(error.message);
  });
