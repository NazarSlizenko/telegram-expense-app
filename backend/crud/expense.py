from backend.models.expense import Expense
from backend.schemas.expense import ExpenseCreate
from sqlalchemy.orm import Session
from sqlalchemy import extract
from sqlalchemy import func

def create_expense(db: Session, expense: ExpenseCreate):
    db_expense = Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expenses(db: Session, user_id: int, month=None, year=None):
    query = db.query(Expense).filter(Expense.user_id == user_id)
    if month and year:
        query = query.filter(
            extract("month", Expense.date) == month,
            extract("year", Expense.date) == year
        )
    return query.all()

def get_monthly_total(db: Session, user_id: int, month: int, year: int):
    total = db.query(func.sum(Expense.amount)).filter(
        Expense.user_id == user_id,
        extract("month", Expense.date) == month,
        extract("year", Expense.date) == year
    ).scalar()
    return total or 0
