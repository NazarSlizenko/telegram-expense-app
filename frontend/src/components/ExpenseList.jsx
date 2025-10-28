import { useEffect, useState } from "react";

function ExpenseList({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [total, setTotal] = useState(0);
  const limit = 500;

  useEffect(() => {
    if (!user) return;

    let url = `/api/expenses?user_id=${user.id}`;
    if (month) url += `&month=${month}&year=${year}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpenses(data));

    if (month) {
      fetch(`/api/expenses/total?user_id=${user.id}&month=${month}&year=${year}`)
        .then((res) => res.json())
        .then((data) => setTotal(data.total));
    } else {
      setTotal(0);
    }
  }, [user, month, year]);

  return (
    <div className="space-y-4">
      {/* Фильтр по месяцу и году */}
      <div className="flex gap-4 items-center flex-wrap">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Все месяцы</option>
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 w-24 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Предупреждение о лимите */}
      {month && total > limit && (
        <div className="p-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded shadow">
          ⚠️ Вы превысили лимит в {limit} BYN: потрачено {total} BYN
        </div>
      )}

      {/* Список расходов */}
      <div className="space-y-2">
        {expenses.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">Нет расходов за выбранный период.</div>
        ) : (
          expenses.map((e) => (
            <div
              key={e.id}
              className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow"
            >
              <div className="font-semibold">{e.category}</div>
              <div>{e.amount} BYN</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(e.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseList;