from typing import List, Optional

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from fastapi.encoders import jsonable_encoder

from .models import Project
from .schema import ProjectIn


class ProjectDAL:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def create_project(self, data: ProjectIn) -> Project:
        new_project = Project(
            name=data.name, github_remote=data.github_remote, github_cwd=data.github_cwd, github_access_token=data.github_access_token, user_ids=data.user_ids
        )
        self.db_session.add(new_project)
        await self.db_session.flush()

        return jsonable_encoder(new_project)

    async def delete_project(self, project_id: int):
        q = await self.db_session.execute(
            delete(Project).where(Project.id == project_id)
        )
        return jsonable_encoder(q.rowcount)

    async def get_project(self, project_id: int) -> Optional[Project]:
        q = await self.db_session.execute(
            select(Project).where(Project.id == project_id)
        )
        return jsonable_encoder(q.scalars().first())

    async def get_all_projects(self) -> List[Project]:
        q = await self.db_session.execute(select(Project).order_by(Project.id))
        return jsonable_encoder(q.scalars().all())

    async def get_projects_for_user_id(self, user_id: int) -> List[Project]:
        q = await self.db_session.execute(
            select(Project).where(user_id in Project.user_ids)
        )
        return jsonable_encoder(q.scalars().all())
