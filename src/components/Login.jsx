import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }
    onLogin(username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">
          Welcome to Kanban
        </h1>

        <input
          type="text"
          placeholder="Enter username or email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-4 bg-zinc-700 text-white rounded"
        />

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-gradient-to-r from-yellow-600 to-amber-500 text-white rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;