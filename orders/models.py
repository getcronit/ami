from pydantic import BaseModel

from tortoise import fields, models
from pydantic import pydantic_model_creator


class Projects(models.Model):
    id = fields.IntField(pk=True)
    github_access_token = fields.TextField()
    github_remote = fields.TextField()
    created_by = fields.IntField()
    created_at = fields.DatetimeField(auto_now_add=True)


Project_Pydantic = pydantic_model_creator(Projects, name='Project')


class ProjectIn_Pydantic(BaseModel):
    github_access_token: str
    github_remote: str
