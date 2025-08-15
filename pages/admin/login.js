import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "1");
      window.location.href = "/admin";
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  }

  return (
    <div className="container">
      <h1>دخول لوحة التحكم</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">دخول</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}