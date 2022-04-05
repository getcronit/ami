import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def _get_accepted_to_emails_from_env():
    email_str = os.getenv("ACCEPTED_TO_EMAILS", "")
    emails = [email.strip() for email in email_str.split(",")]

    return emails


def send_mail(to_email: str, reply_to_email: str, subject: str, content: str):

    if to_email not in _get_accepted_to_emails_from_env():
        raise Exception(f"{to_email} is not an accepted email")

    api_key = os.getenv("SENDGRID_API_KEY")
    from_email = os.getenv("SENDGRID_FROM_EMAIL")

    if not api_key:
        raise Exception("SENDGRID_API_KEY is not set")

    if not from_email:
        raise Exception("SENDGRID_FROM_EMAIL is not set")

    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        plain_text_content=content,
    )

    message.reply_to = reply_to_email

    try:
        sg = SendGridAPIClient(api_key=api_key)
        response = sg.send(message)
        return response
    except Exception as e:
        raise e
