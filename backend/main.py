from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.database import SessionLocal, engine, Base
from backend.models.expense import Expense
from backend.schemas.expense import ExpenseCreate, ExpenseOut
from backend.crud.expense import create_expense, get_expenses, get_monthly_total

from sqlalchemy import extract

# Создание таблиц
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Разрешаем CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно указать конкретный домен фронта
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Зависимость для получения сессии БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Эндпоинт: добавление расхода
@app.post("/api/expenses", response_model=ExpenseOut)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return create_expense(db, expense)

# Эндпоинт: получение списка расходов с фильтром по месяцу и году
@app.get("/api/expenses", response_model=List[ExpenseOut])
def read_expenses(
    user_id: int,
    month: Optional[int] = Query(None),
    year: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    return get_expenses(db, user_id, month, year)

# Эндпоинт: сумма расходов за месяц
@app.get("/api/expenses/total")
def get_total(
    user_id: int,
    month: int,
    year: int,
    db: Session = Depends(get_db)
):
    total = get_monthly_total(db, user_id, month, year)
    return {"total": total}