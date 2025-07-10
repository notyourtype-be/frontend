import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

const Loginpage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // If status not 2xx
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();

      // Assuming API returns a token or user info
      // Save token or user info to localStorage/sessionStorage as needed
     localStorage.setItem("accessToken", data.access);
     localStorage.setItem("refreshToken", data.refresh);
      // Redirect to homepage
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>

      

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </div>
          {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Loginpage;
