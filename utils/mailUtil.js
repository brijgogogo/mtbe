const nodemailer = require("nodemailer");
const config = require("../config");
const logger = require("./logger");

const transport = nodemailer.createTransport(config.mailConfig);

const mailUtil = {
  getMessage: function (subject, text, html) {
    return {
      from: "MT System <mt@mt.com>",
      to: "mt2@mt.com",
      subject: subject,
      text: text,
      html: html,
    };
  },
  sendMessage: async function (message) {
    try {
      const info = await transport.sendMail(message);
      logger.info(info, "mail sent");
    } catch (err) {
      logger.error(err, "mail failure");
    }
  },
  sendMail: async function (subject, text, html) {
    const message = this.getMessage(subject, text, html);
    this.sendMessage(message);
  },
};

module.exports = mailUtil;
