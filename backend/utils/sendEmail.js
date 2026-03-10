const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(to, subject, text) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const message = [`From: ${EMAIL_USER}`, `To: ${to}`, `Subject: ${subject}`, "", text].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    return res.data;
  } catch (err) {
    console.error("Error sending email via Gmail API:", err);
    throw new Error("Email sending failed");
  }
}

module.exports = sendEmail;
