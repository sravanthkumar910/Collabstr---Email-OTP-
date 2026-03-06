import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Ensure Link is imported

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* --- ADD THIS SECTION BELOW --- */}
        <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#9896B8' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#8B5CF6', textDecoration: 'none', fontWeight: '700' }}>
            Create one
          </Link>
        </div>
        {/* ------------------------------ */}
      </div>
    </div>
  );
}