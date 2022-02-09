import nodemailer from 'nodemailer'
import { EMAIL_CONFIG } from '../config'
import type { EmailInfo } from '../types/common'

// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo: EmailInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(EMAIL_CONFIG)

  // send mail with defined transport object
  return await transporter.sendMail({
    from: `"认证邮件" <${EMAIL_CONFIG.auth.user}>`, // sender address
    to: sendInfo.username, // list of receivers
    subject: `您好，${sendInfo.nickname}，密码重置邮件`, // Subject line
    // text: ``, // plain text body
    html: `
        <div style="border: 1px solid #dcdcdc;color: #676767;width: 600px; margin: 0 auto; padding-bottom: 50px;position: relative;">
        <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">密码找回</div>
        <div style="padding: 25px">
          <div>您好，${sendInfo.nickname}，您的新密码为: ${sendInfo.password}</div>
          <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
        </div>
        <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
    </div>
    ` // html body
  })
}

export default send
