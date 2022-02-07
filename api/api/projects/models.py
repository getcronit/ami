from multiprocessing.dummy import Array
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, ARRAY

from api.database import Base


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
