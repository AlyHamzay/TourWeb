import React, { useState , useContext } from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link,useNavigate } from "react-router-dom";
import LI from "../assets/images/login.png";
import UserI from "../assets/images/user.png";
import {AuthContext} from "./../context/AuthContext"
import {BASE_URL} from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type:'LOGIN_START'})
    try{

      const res = await fetch(`${BASE_URL}/auth/login`,{
        method: 'post',
        headers :{
          'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(credentials)
      });
      const result =await res.json();
      if(!res.ok)alert(result.message)

        console.log(result.data)
        dispatch({type:'LOGIN_SUCCESS',payload:result.data})
        navigate('/')
    }catch(e){
      dispatch({type:'LOGIN_FAILURE',payload:e.message})
      alert('Failed to login')

    }
    // Add API call for authentication here
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="login__container">
              <div className="login__img">
                <img src={LI} alt="Login Illustration" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={UserI} alt="User Icon" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
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
                  <button
                    className="btn secondary_btn auth_btn"
                    type="submit"
                  >
                    Login
                  </button>
                </Form>
                <p>
                  Don't have an account? <Link className='text-white text-semibold 'to="/register">Sign Up</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
