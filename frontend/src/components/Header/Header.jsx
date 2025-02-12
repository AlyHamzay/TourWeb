import React, { useRef, useEffect,useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import {AuthContext } from '../../context/AuthContext'


const nav__Links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tour',
    display: 'Tours',
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const{user,dispatch}=useContext(AuthContext);

  const logout = () => {
    dispatch({type:'LOGOUT'});
    navigate('/');
  }

  const stickyHeaderFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyHeaderFunc);
    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []); // Dependency array ensures the effect runs only once

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* ======= Logo ======= */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/* ======= Menu ======= */}
            <div className="navigation">
              <ul className="menu d-flex text-black align-items-center gap-5">
                {nav__Links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? 'active__link' : ''
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ======= Buttons ======= */}
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-4">
              {
                    user?(<>
                    <h5 className='mb-0'>{user.username}</h5>
                      <Button className='btn btn-darker' onClick={logout}>Logout</Button>
                    </> ): (<>
                    <Button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/register">Register</Link>
                </Button>
                    </>)
                  }
              </div>
              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
