import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import API from "../services/api";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
            <FaLock className="input-icon" />
          </div>

          <div className="options">

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <span className="forgot">
              Forgot Password?
            </span>

          </div>

          <button type="submit">
            Login
          </button>

          <p className="register-text">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;