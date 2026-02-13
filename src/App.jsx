import { useState, useEffect } from "react";
import Login from "./components/Login";
import Board from "./components/Board";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("kanbanUser");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("kanbanUser", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("kanbanUser");
    setUser(null);
  };

  return user ? (
    <Board user={user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;