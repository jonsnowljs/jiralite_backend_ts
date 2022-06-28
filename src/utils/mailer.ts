import nodemailer, { SendMailOptions } from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import log from './logger';

const smtp = {
  user: String(process.env.SMTP_USER),
  pass: String(process.env.SMTP_PASSWORD),
  host: String(process.env.SMTP_HOST),
  port: Number(process.env.SMTP_PORT!),
  secure: Boolean(process.env.SMTP_SECURE),
};

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {user: smtp.user, pass: smtp.pass}
})

async function sendEmail(payload: SendMailOptions){
  transporter.sendMail(payload, (err, info)=>{
    if (err) {
      log.error(err, "There is an error in sending email")
      return;
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })

}

export default sendEmail