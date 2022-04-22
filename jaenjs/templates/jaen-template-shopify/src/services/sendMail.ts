export const sendEmail = async (args: {
  fromEmail: string
  name: string
  subject: string
  message: string
}) => {
  const {fromEmail, name, subject, message} = args

  return await fetch('https://api.snek.at/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to_email: 'nicoschett@icloud.com',
      reply_to_email: fromEmail,
      subject: `${name} - ${subject}`,
      content: message
    })
  })
}
