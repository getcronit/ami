from multiprocessing.dummy import Array
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY

from api.database import Base

import uuid


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    github_remote = Column(String)
    github_cwd = Column(String, default=".")
    github_access_token = Column(String)
    user_ids = Column(
        ARRAY(Integer), nullable=True
    )  # array because users will end up in a own microservice
    publish_token = Column(String, default=lambda: str(uuid.uuid4().hex), unique=True)
