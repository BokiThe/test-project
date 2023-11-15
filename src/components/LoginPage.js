// components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../style/loginpage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Combine the login function here
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://t-adria.com/api/login",
        {
          username,
          password,
          mac: "a1:b2:c3:d4:b5",
          device_uid: "TV12345",
          language_id: "2",
          device_type: "SamsungTv",
        },
        {
          headers: {
            reskin: "adria",
            "language-id": "2",
          },
        }
      );

      console.log("Login response:", response);
      const accessToken = response.access_token;
      localStorage.setItem("access_token", accessToken);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, display message to the user
    }
  };

  return (
    <div className="main-wrapper">
      <h2>Sign In</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
