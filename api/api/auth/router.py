from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT

from api.dependencies import get_user_dal, UserDAL


from .schema import LoginIn, LoginOut, RefreshOut

router = APIRouter(
    prefix="/auth",
)


@router.post("/login", response_model=LoginOut)
async def login(
    user: LoginIn,
    Authorize: AuthJWT = Depends(),
    user_dal: UserDAL = Depends(get_user_dal),
):
    validated_user = await user_dal.login_user(user.email, user.password)

    if not validated_user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    # Create the tokens and passing to set_access_cookies or set_refresh_cookies
    access_token = Authorize.create_access_token(
        subject=validated_user.get("id"),
        user_claims={"is_admin": validated_user.get("is_admin")},
    )
    refresh_token = Authorize.create_refresh_token(subject=validated_user.get("id"))

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.post("/refresh", response_model=RefreshOut, operation_id="authorize")
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()

    user_claims = {}
    user_claims["is_admin"] = Authorize.get_raw_jwt().get("is_admin", False)

    new_access_token = Authorize.create_access_token(
        subject=current_user, user_claims={**user_claims}
    )

    return {
        "access_token": new_access_token,
    }


@router.delete("/logout", operation_id="authorize")
async def logout(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    return {"msg": "Successfully logout"}
