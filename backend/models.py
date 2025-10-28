from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database import Base

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    category = Column(String)
    amount = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)