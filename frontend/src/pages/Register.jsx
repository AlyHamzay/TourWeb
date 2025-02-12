import React, { useState, useContext } from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import RI from "../assets/images/register.png";
import UserI from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
if (!passwordRegex.test(credentials.password)) {
  <p>
    
  </p>
  setErrorMessage(
    "Password must be at least 8 characters long and include at least 1 uppercase letter and 1 numeric digit."
  );
  return;
}


    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.message);
        return;
      }

      // Registration success
      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage(""); // Clear any error messages
      dispatch({ type: "REGISTER_SUCCESS" });
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="login__container">
              <div className="login__img">
                <img src={RI} alt="Login Illustration" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={UserI} alt="User Icon" />
                </div>
                <h2>Register</h2>
                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-success text-center">{successMessage}</p>
                )}
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="User Name"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <button className="btn auth_btn" type="submit">
                    Sign Up
                  </button>
                </Form>
                <p>
                  Already have an account?{" "}
                  <Link className="text-white text-semibold" to="/Login">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
