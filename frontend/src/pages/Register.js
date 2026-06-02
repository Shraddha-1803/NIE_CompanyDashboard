import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import API from "../services/api";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Register</h1>

        <form onSubmit={handleRegister}>

          <div className="input-box">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
            <FaUser className="input-icon" />
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
            <FaEnvelope className="input-icon" />
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

          <button type="submit">
            Register
          </button>

          <p className="register-text">
            Already have an account?{" "}
            <Link
              to="/"
              className="register-link"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;