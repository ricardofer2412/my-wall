const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
const nodemailer = require("nodemailer");

admin.initializeApp();

const gmailEmail = "silverlogictest@gmail.com";
const gmailPassword = "5618096706";
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  const recipent_email = user.email;

  const mailOptions = {
    from: 'Silver Logic" silverlogictest@gmail.com',
    to: recipent_email,
    subject: "Welcome to the Silver Logic Feed!",
    html: "<h1>Welcome to the Silver Logic Feed!</h1>"
  };

  try {
    mailTransport.sendMail(mailOptions);
    console.log("mail send");
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
  return null;
});