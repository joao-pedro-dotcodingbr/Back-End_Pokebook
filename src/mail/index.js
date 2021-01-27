
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require('./config/auth')
const templatePass = require('./template/MensagePass')
const templateAuth = require('./template/auth')

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({

    host: SMTP_CONFIG.host,
    port:SMTP_CONFIG.port,
    secure:false,
    auth: {
      user: SMTP_CONFIG.user, // generated ethereal user
      pass: SMTP_CONFIG.pass, // generated ethereal password
    },

    tls:{
      rejectUnauthorized:false
    }

  });

async function SendMensagePass(from , to , subject , text , [title , subtitle , token]) {
 
  // send mail with defined transport object
 await transporter.sendMail({
    from: from, // sender address
    to: to,
    subject:subject, // Subject line
    text: text ,// plain text body
    html: templatePass(title , subtitle , token), // html body
  });


}

async function SendMensage(from , to , subject , text , [ title , subtitle ]) {
 
  // send mail with defined transport object
 await transporter.sendMail({
    from: from, // sender address
    to: to,
    subject:subject, // Subject line
    text: text ,// plain text body
    html: templateAuth(title , subtitle), // html body
  });


}

module.exports = {SendMensagePass , SendMensage}
