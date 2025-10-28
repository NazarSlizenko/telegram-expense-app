import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList"; // не забудь импортировать
import ThemeToggle from "./components/ThemeToggle";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready(); // Инициализация Telegram WebApp
    setUser(tg.initDataUnsafe.user);
  }, []);

  return (
    <div className="App p-4 space-y-4">
      {user && (
        <>
          <ThemeToggle />
          <ExpenseForm user={user} />
          <ExpenseList user={user} />
        </>
      )}
    </div>
  );
}

export default App;