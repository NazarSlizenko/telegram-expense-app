from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from database import SessionLocal, engine, Base
from models import Expense
from schemas import ExpenseCreate, ExpenseOut
from crud import create_expense, get_expenses, get_monthly_total

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.post("/api/expenses", response_model=ExpenseOut)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return create_expense(db, expense)

@app.get("/api/expenses", response_model=List[ExpenseOut])
def read_expenses(user_id: int, month: Optional[int] = Query(None), year: Optional[int] = Query(None), db: Session = Depends(get_db)):
    return get_expenses(db, user_id, month, year)

@app.get("/api/expenses/total")
def get_total(user_id: int, month: int, year: int, db: Session = Depends(get_db)):
    return {"total": get_monthly_total(db, user_id, month, year)}