from .database import async_session
from .projects.project_dal import ProjectDAL
from .users.user_dal import UserDAL


async def get_project_dal():
    async with async_session() as session:
        async with session.begin():
            yield ProjectDAL(session)


async def get_user_dal():
    async with async_session() as session:
        async with session.begin():
            yield UserDAL(session)
