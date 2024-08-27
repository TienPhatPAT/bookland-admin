import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.scss";
import logo from "../img/logo.svg";
import exit from "../img/exit.svg";
import fb from "../img/fb.svg";
import gg from "../img/googlee.svg";

const Login = ({ onToggleLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError("Xin hãy điền email.");
      return;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await fetch(process.env.REACT_APP_URL + "auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, matkhau: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user); // Ensure this returns user data
        onToggleLogin("");

        // Redirect based on user type
        if (data.user.loaitaikhoan === 0) {
          navigate("/home"); // Redirect to home for regular users
        } else if (data.user.loaitaikhoan === 1) {
          navigate("/da"); // Redirect to admin for admin users
        }
      } else {
        setLoginError(data.message || "Đã xảy ra lỗi khi đăng nhập.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error);
      setLoginError("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  return (
    <div className={classes.loginC}>
      <div className={classes.overlay} onClick={() => onToggleLogin("")}></div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.group}>
            <div className={classes.logos}>
              <img className={classes.Licon} src={logo} alt="Logo" />
            </div>
            <h1 className={classes.furnito}></h1>
          </div>
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="email">
              Email:
            </label>
            <input
              className={classes.formInput}
              type="email"
              placeholder="Email"
              id="email"
              defaultValue={"admin@gmail.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={classes.error}>{emailError}</p>}
          </div>
          <div className={classes.formGroup}>
            <label className={classes.formLabel} htmlFor="password">
              Mật Khẩu:
            </label>
            <input
              className={classes.formInput}
              type="password"
              placeholder="******"
              id="password"
              defaultValue={"admin"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className={classes.error}>{passwordError}</p>}
          </div>
          <button className={classes.submitButton} type="submit">
            Đăng nhập
          </button>
          {loginError && <p className={classes.error}>{loginError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
