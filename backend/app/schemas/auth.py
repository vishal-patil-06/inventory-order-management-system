from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class RegisterRequest(BaseModel):
    full_name: str = Field(
        min_length=2,
        max_length=255
    )

    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=64
    )


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class OwnerLoginResponse(BaseModel):
    owner_id: int
    full_name: str
    email: str

    @classmethod
    def from_owner(cls, owner):
        return cls(
            owner_id=owner.id,
            full_name=owner.full_name,
            email=owner.email
        )