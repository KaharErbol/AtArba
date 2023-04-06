from pydantic import BaseModel
from typing import Union, List
from queries.pool import pool

class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    phone: int
    zip: int
    password: str
    avatar_url: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    phone: int
    zip: int
    password: str
    avatar_url: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo:

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            id,
                            first_name,
                            last_name,
                            username,
                            email,
                            phone,
                            zip,
                            avatar_url
                        FROM users;
                        """
                    )
                    return [
                        self.record_to_account_out_without_password(record)
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not get all users"}
    

    def get_one(self, id: int) -> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, first_name, last_name, username, email, phone, zip, avatar_url
                        FROM users
                        WHERE id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out_without_password(record)
        except Exception:
            return {"message": "Could not get account"}

    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id,
                            first_name,
                            last_name,
                            username,
                            email,
                            phone,
                            zip,
                            hashed_password,
                            avatar_url
                        FROM users;
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}


    def create(self, user: AccountIn,
               hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name,
                            last_name,
                            username,
                            email,
                            phone,
                            zip,
                            hashed_password,
                            avatar_url)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING
                        first_name,
                            last_name,
                            username,
                            email,
                            phone,
                            zip,
                            hashed_password,
                            avatar_url;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            user.email,
                            user.phone,
                            user.zip,
                            hashed_password,
                            user.avatar_url,
                        ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        username=user.username,
                        first_name=user.first_name,
                        last_name=user.last_name,
                        email=user.email,
                        phone=user.phone,
                        zip=user.zip,
                        hashed_password=hashed_password,
                        avatar_url=user.avatar_url
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception:
            return False

    def update(self, id: int, user: AccountIn) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name= %s,
                            last_name= %s,
                            username = %s,
                            email = %s,
                            phone= %s,
                            zip= %s,
                            avatar_url = %s
                        WHERE id = %s
                        """,
                        [

                            user.first_name,
                            user.last_name,
                            user.username,
                            user.email,
                            user.phone,
                            user.zip,
                            user.avatar_url,
                            id
                        ]
                    )
                    return self.account_in_to_out(id, user)
        except Exception:
            return {"message": "Could not update your account"}


    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "id": record[0],
            "first_name": record[1],
            "last_name": record[2],
            "username": record[3],
            "email": record[4],
            "zip": record[5],
            "phone": record[6],
            "hashed_password": record[7],
            "avatar_url": record[8]
        }

        return account_dict




    def account_in_to_out(self, id: int, user: AccountIn):
        old_data = user.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account_out_without_password(self, record):
        return AccountOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            username=record[3],
            email=record[4],
            phone=record[5],
            zip=record[6],
            avatar_url=record[7],
        )
