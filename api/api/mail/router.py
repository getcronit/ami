from fastapi import APIRouter, HTTPException

import api.mail.services as mail_services

router = APIRouter(prefix="/mail")

@router.post("/send")
async def send_mail(
    to_email: str,
    reply_to_email: str,
    subject: str,
    content: str
):
    try:
        
        r = mail_services.send_mail(to_email, reply_to_email, subject, content)

        if r.status_code != 202:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))