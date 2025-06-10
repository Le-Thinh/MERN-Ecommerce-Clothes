"use strict";

const transport = require("../db/init.nodemailer");
const { replacePlaceholder } = require("../utils");
const { newOtp } = require("./otp.service");
const templateService = require("./template.service");

class EmailService {
  static sendMailLinkVerify = async ({
    html,
    toEmail,
    subject = "Xác nhận email đăng ký!",
    text = "Xác nhận,...",
  }) => {
    try {
      const mailOptions = {
        from: " 'ChillNFreeShop' <lqt9112003@gmail.com> ",
        to: toEmail,
        subject,
        text,
        html,
      };

      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("message sent::", info.messageId);
        }
      });
    } catch (error) {
      console.error(`Error send mail::`, error);
      return error;
    }
  };

  static sendEmailToken = async ({ email }) => {
    try {
      const token = await newOtp({ email });
      console.log("Token Verify Email:: ", token);

      const template = await templateService.getTemplate({
        tem_name: "HTML Email Token",
      });

      if (!template) throw new NotFoundError("Template not found");

      const content = replacePlaceholder(template.tem_html, {
        link_verify: `http://localhost:3000/verify-email?token=${token.otp_token}`,
      });

      this.sendMailLinkVerify({
        html: content,
        toEmail: email,
        subject: "Vui lòng xác nhận địa chỉ email đăng ký",
      }).catch((err) => console.error(err));

      return 1;
    } catch (error) {
      console.error(`Error send mail::`, error);
      return error;
    }
  };
}

module.exports = EmailService;
