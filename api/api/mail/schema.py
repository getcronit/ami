from pydantic import BaseModel

class SendMail(BaseModel):
    to_email: str
    reply_to_email: str
    subject: str
    content: str