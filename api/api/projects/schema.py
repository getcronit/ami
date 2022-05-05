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


class ProjectCreateOut(ProjectOut):
    publish_token: str
    sheets_token: str


class ProjectInDB(ProjectIn):
    user_ids: List[int]
