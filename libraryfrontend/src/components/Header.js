import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Navbar, Nav, Row, Col, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {logout} from "../actions/userActions";
import '../bootstrap.min.css';
import 'bootstrap';
import SearchBox from "./SearchBox";

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className="text-center">
            <Navbar collapseOnSelect expand="lg" className='container-fluid' variant="dark"
                    style={{backgroundColor: "green", paddingLeft: '2%', paddingRight: '2%'}}>
                <LinkContainer to="/">
                    <Navbar.Brand>LIBRARY</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">

                     <LinkContainer to="/bag" style={{width: 'auto', height: 53, float: "left", borderRadius:'50%',
                         margin:'auto', paddingTop: 15, color: "green", backgroundColor:'white'
                    }}><Nav.Link>
                            <i className="fas fa-shopping-cart fa-2x"></i>
                        </Nav.Link></LinkContainer>

                    <SearchBox />


                    <Nav className="ms-auto">

                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link className="dropdown-toggle"><i className="fa fa-sign-in fa-lg"
                                                                         aria-hidden="true"> </i> Login</Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo ? (<span></span>) : (
                            <LinkContainer to="/signup">
                                <Nav.Link className="dropdown-toggle"><i className="fa fa-user-plus"
                                                                         aria-hidden="true"> </i> Sign-Up</Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <Link to='/admin' className='dropdown-toggle admin '> ADMIN <i
                                className="fas fa-lock-open fa-2x"></i></Link>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </header>
    )

}

export default Header