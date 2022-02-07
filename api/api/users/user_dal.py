from typing import List, Optional

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from fastapi.encoders import jsonable_encoder
from api.users.schema import UserIn

from api.utils import verify_password, get_password_hash

from .models import User


class UserDAL:
    def __init__(self, db_session: Session):
        self.db_session = db_session

    async def login_user(self, email: str, password: str) -> Optional[User]:
        q = await self.db_session.execute(select(User).where(User.email == email))
        user = q.scalars().first()

        if user and verify_password(password, user.hashed_password):
            return jsonable_encoder(user)
        return None

    async def create_user(self, data: UserIn) -> Optional[User]:
        new_user = User(
            email=data.email,
            hashed_password=get_password_hash(data.password),
            full_name=data.full_name,
            is_admin=data.is_admin,
        )
        self.db_session.add(new_user)
        await self.db_session.flush()

        return jsonable_encoder(new_user)

    async def delete_user(self, user_id: int):
        q = await self.db_session.execute(delete(User).where(User.id == user_id))
        return jsonable_encoder(q.rowcount)

    async def get_user(self, user_id: int) -> Optional[User]:
        q = await self.db_session.execute(select(User).where(User.id == user_id))
        return jsonable_encoder(q.scalars().first())

    async def get_user_by_email(self, email: str) -> Optional[User]:
        q = await self.db_session.execute(select(User).where(User.email == email))
        return jsonable_encoder(q.scalars().first())

    async def get_all_users(self) -> List[User]:
        q = await self.db_session.execute(select(User).order_by(User.id))
        return jsonable_encoder(q.scalars().all())
