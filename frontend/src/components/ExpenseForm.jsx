import { useState } from "react";

function ExpenseForm({ user }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      amount: parseFloat(amount),
      category,
      date,
      user_id: user.id,
    };

    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Можно добавить анимацию успеха или очистку формы
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
    </form>
  );
}

export default ExpenseForm;