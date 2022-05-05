from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT

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


async def project_sheet_auth(
    project_id: int,
    Authorize: AuthJWT = Depends(),
    project_dal: ProjectDAL = Depends(get_project_dal),
    sheets_token: str = None,
):
    Authorize.jwt_optional()

    user_id = Authorize.get_jwt_subject()

    if user_id is not None or sheets_token is not None:
        project = await project_dal.get_project(project_id)

        if project:
            if sheets_token == project.get("sheets_token") or user_id in project.get(
                "user_ids"
            ):
                return True

    raise HTTPException(
        status_code=403, detail="You are not authorized to perform this action"
    )
