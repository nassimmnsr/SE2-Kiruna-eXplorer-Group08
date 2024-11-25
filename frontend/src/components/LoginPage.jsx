import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div 
    className="d-flex justify-content-center align-items-center vh-100 bg-light"
    style={{marginTop: "-50px"}}
    >
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="card-title text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Complete login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
