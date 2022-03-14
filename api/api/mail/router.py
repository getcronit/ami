from fastapi import APIRouter, HTTPException

from .schema import SendMail
from . import services as mail_services

router = APIRouter(prefix="/mail")

@router.post("/send")
async def send_mail(
    send_mail: SendMail,
):
    try:
        r = mail_services.send_mail(**send_mail.dict())

        if r.status_code != 202:
            raise HTTPException(status_code=r.status_code, detail=r.text)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))