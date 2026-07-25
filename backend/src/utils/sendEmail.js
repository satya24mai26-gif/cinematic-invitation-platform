import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Create OAuth2 client using credentials from environment variables
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// Set the refresh token obtained from OAuth Playground
oAuth2Client.setCredentials({ 
  refresh_token: process.env.GMAIL_REFRESH_TOKEN 
});

/**
 * Sends an email using the Gmail REST API (Port 443 / HTTPS).
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} html - Email body in HTML format
 */
const sendEmail = async (to, subject, html) => {
  console.log(`[EMAIL] Initiating email send to: ${to}`);
  
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Base64 encode the subject line for UTF-8 character support
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    
    // Construct the standard RFC 2822 formatted email
    const messageParts = [
      `From: ${process.env.EMAIL_USER}`,
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '', // Blank line separating headers from body
      html,
    ];
    
    const rawMessage = messageParts.join('\n');

    // Convert message to base64url format as required by Gmail REST API
    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Execute HTTP POST request over Port 443
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(`[EMAIL SUCCESS] Message ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('[EMAIL ERROR] Failed to send email via Gmail API:', error.message);
    throw error;
  }
};

export default sendEmail;
