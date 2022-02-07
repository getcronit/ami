from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT

from api.dependencies import get_user_dal, UserDAL

from .schema import UserOut, UserIn

router = APIRouter(prefix="/users")


@router.get("/me", response_model=UserOut)
async def read_me(
    Authorize: AuthJWT = Depends(), user_dal: UserDAL = Depends(get_user_dal)
):
    Authorize.jwt_required()
    user_id = Authorize.get_jwt_subject()

    return await user_dal.get_user(user_id)


@router.post("", response_model=UserOut, operation_id="authorize")
async def create_user(
    user: UserIn,
    Authorize: AuthJWT = Depends(),
    user_dal: UserDAL = Depends(get_user_dal),
):
    Authorize.jwt_required()
    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    if await user_dal.get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    return await user_dal.create_user(user)


@router.get("", response_model=List[UserOut])
async def read_users(
    Authorize: AuthJWT = Depends(), user_dal: UserDAL = Depends(get_user_dal)
):
    Authorize.jwt_required()

    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    return await user_dal.get_all_users()


@router.get("/{user_id}", response_model=UserOut)
async def read_user(
    user_id: int,
    Authorize: AuthJWT = Depends(),
    user_dal: UserDAL = Depends(get_user_dal),
):
    Authorize.jwt_required()
    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    user = await user_dal.get_user(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.delete("/{user_id}", operation_id="authorize")
async def delete_user(
    user_id: int,
    Authorize: AuthJWT = Depends(),
    user_dal: UserDAL = Depends(get_user_dal),
):
    Authorize.jwt_required()
    if not Authorize.get_raw_jwt()["is_admin"]:
        raise HTTPException(
            status_code=403, detail="You are not authorized to perform this action"
        )

    user = await user_dal.get_user(user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await user_dal.delete_user(user_id)
