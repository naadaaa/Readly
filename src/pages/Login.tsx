import { useState } from "react";
import type { FormEvent, CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError("Failed to log in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Log In to Readly</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 24,
    border: "1px solid #ddd",
    borderRadius: 8,
    fontFamily: "sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    padding: 10,
    fontSize: 16,
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};