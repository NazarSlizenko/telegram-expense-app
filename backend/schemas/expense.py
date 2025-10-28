from pydantic import BaseModel
from datetime import datetime

class ExpenseCreate(BaseModel):
    user_id: int
    category: str
    amount: float
    date: datetime

class ExpenseOut(ExpenseCreate):
    id: int

    class Config:
        from_attributes = True