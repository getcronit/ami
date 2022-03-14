from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT


from api.dependencies import get_project_dal, ProjectDAL

from .services import trigger_github_event
from .schema import ProjectIn, ProjectOut, PublishProjectIn

router = APIRouter(prefix="/projects")


@router.post("", response_model=ProjectOut, operation_id="authorize")
async def create_project(
    project: ProjectIn,
    Authorize: AuthJWT = Depends(),
    project_dal: ProjectDAL = Depends(get_project_dal),
):
    Authorize.jwt_required()

    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    return await project_dal.create_project(project)


@router.get("", response_model=List[ProjectOut])
async def read_projects(
    Authorize: AuthJWT = Depends(), project_dal: ProjectDAL = Depends(get_project_dal)
):
    Authorize.jwt_required()

    if Authorize.get_raw_jwt()["is_admin"]:
        return await project_dal.get_all_projects()

    user_id = Authorize.get_jwt_subject()
    return await project_dal.get_projects_for_user_id(user_id)


@router.get("/{project_id}", response_model=ProjectOut)
async def read_project(
    project_id: int,
    Authorize: AuthJWT = Depends(),
    project_dal: ProjectDAL = Depends(get_project_dal),
):
    Authorize.jwt_required()

    project = await project_dal.get_project(project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    user_id = Authorize.get_jwt_subject()

    if user_id not in project.get("user_ids"):
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    return project


@router.delete("/{project_id}", operation_id="authorize")
async def delete_project(
    project_id: int,
    Authorize: AuthJWT = Depends(),
    project_dal: ProjectDAL = Depends(get_project_dal),
):
    Authorize.jwt_required()

    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    return await project_dal.delete_project(project_id)


@router.post("/{project_id}/publish", operation_id="authorize")
async def publish_project(
    project_id: int,
    body: PublishProjectIn,
    Authorize: AuthJWT = Depends(),
    project_dal: ProjectDAL = Depends(get_project_dal),
):
    Authorize.jwt_required()

    user_id = Authorize.get_jwt_subject()
    project = await project_dal.get_project(project_id)

    if user_id not in project.get("user_ids"):
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )
        
    return await trigger_github_event(
        project_github_remote=project["github_remote"],
        project_github_cwd=project["github_cwd"],
        project_github_access_token=project["github_access_token"],
        migration_url=body.migraiton_url,
    )
