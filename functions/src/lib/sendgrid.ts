import * as sendgrid from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY as string;

sendgrid.setApiKey(API_KEY);

function _buildEmailBody(payload: any) {
  console.log(Object.entries(payload));
  const html = `
  <p>Hello there. You have received a new message. This is what they had to say:</p>
  <ul>
    ${Object.entries(payload).map(
      ([key, value]) => `<li><b>${key}: </b>${value}</li>`
    ).join('')}
  </ul>
`;
  console.log(html);
  return html;
}

function sendEmail(to: string, subject: string, payload: any) {
  const message : sendgrid.MailDataRequired = {
    to,
    from: {
      email: 'noreply@formaly.app',
      name: 'Formaly'
    },
    subject,
    html: _buildEmailBody(payload)
  };

  if(payload.hasOwnProperty('replyTo') && payload.replyTo !== '' && payload.replyTo) {
    message.replyTo = {
      email: payload["replyTo"]
    }
  }

  return sendgrid.send(message);
}

const SG = {
  sendEmail
};

export default SG;
