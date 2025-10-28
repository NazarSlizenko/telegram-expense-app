function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
    >
      🌗 Переключить тему
    </button>
  );
}

export default ThemeToggle;