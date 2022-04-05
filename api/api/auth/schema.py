from pydantic import BaseModel


class LoginIn(BaseModel):
    email: str
    password: str


class LoginOut(BaseModel):
    access_token: str
    refresh_token: str


class RefreshOut(BaseModel):
    access_token: str
