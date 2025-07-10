import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signuppage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [dob, setDob] = useState(""); // ISO format yyyy-mm-dd
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
          phoneno: phoneno.trim(),
          dob: dob,
          firstname: firstname.trim(),
          lastname: lastname.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      navigate("/login");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signuppage">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="text"
              id="phoneno"
              placeholder="Enter your phone number"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
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
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signuppage;
