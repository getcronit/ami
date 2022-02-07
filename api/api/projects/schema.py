from typing import List
from pydantic import BaseModel


class ProjectBase(BaseModel):
    name: str
    github_remote: str
    github_cwd: str = "."
    user_ids: List[int]


class ProjectIn(ProjectBase):
    github_access_token: str


class ProjectOut(ProjectBase):
    id: int


class ProjectInDB(ProjectIn):
    user_ids: List[int]


class PublishProjectIn(BaseModel):
    migraiton_url: str
