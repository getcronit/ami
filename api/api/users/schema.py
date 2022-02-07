from typing import Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_admin: Optional[bool] = False


class UserIn(UserBase):
    password: str


class UserOut(UserBase):
    id: str


class UserInDB(UserBase):
    hashed_password: str
