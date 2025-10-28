const tg = window.Telegram.WebApp;
tg.expand();

document.getElementById("expense-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const user_id = tg.initDataUnsafe.user?.id || 0;

  const expense = {
    user_id,
    category,
    amount,
    date: new Date().toISOString()
  };

  try {
    const res = await fetch("https://твой-бэкенд.onrender.com/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)
    });
    const data = await res.json();
    alert("Сохранено: " + data.id);
  } catch (err) {
    alert("Ошибка: " + err.message);
  }
});