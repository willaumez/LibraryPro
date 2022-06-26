import React from "react";
import {Container, Row, Col, Image, Nav} from 'react-bootstrap';
import 'react-bootstrap';
import '../bootstrap.min.css';
import {LinkContainer} from "react-router-bootstrap";

function Footer() {
    return(
        <footer>
            <Container fluid className="text-center">
                <Row>
                    <Col  className="text-center py-3 float-start bg-success" style={{color:"white"}}> Library Project</Col>
                </Row>
                <Row>
                    <Col className="">
                        <Image src="https://www.emsi.ma/wp-content/uploads/2020/07/logo.png" rounded className="h-auto align-self-auto"
                               style={{float: "left", padding:10}}>

                        </Image></Col>
                    <Col>
                        {
                        <div className="container p-4 pb-0">
                        <section className="mb-4">
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{backgroundColor: '#3b5998', borderRadius:'30%'}}
                                href="https://www.facebook.com/"
                                role="button" target='_blank' rel="noreferrer"
                            ><i className="fab fa-facebook-f"></i
                            ></a>

                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{backgroundColor: '#55acee', borderRadius:'30%'}}
                                href="https://twitter.com/i/flow/login"
                                role="button" target='_blank'
                            ><i className="fab fa-twitter"></i
                            ></a>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{backgroundColor: '#333333', borderRadius:'30%'}}
                                href="https://github.com/willaumez/LibraryPro.git"
                                role="button" target='_blank'
                            ><i className="fab fa-github"></i
                            >
                                Source Code
                            </a>

                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{backgroundColor: '#dd4b39', borderRadius:'30%'}}
                                href="https://www.google.com/"
                                role="button" target='_blank'
                            ><i className="fab fa-google"></i
                            ></a>


                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                className="btn btn-primary btn-floating m-1"
                                style={{backgroundColor: '#0082ca', borderRadius:'30%'}}
                                href="https://www.linkedin.com/"
                                role="button" target='_blank'
                            ><i className="fab fa-linkedin-in"></i
                            ></a>

                        </section>
                    </div> }

                    </Col>
                    <Col style={{marginTop:20}}>
                        <LinkContainer to="/aboutUs">
                            <Nav.Link><i className="fa fa-info-circle" aria-hidden="true"></i> About-US</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contactUS">
                            <Nav.Link><i className="fas fa-contact-book"></i>Contact-US</Nav.Link>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row>
                    <Col  className="text-center py-3 float-start bg-success"  style={{color:"white"}}> Copiright &copy;  Library</Col>
                </Row>
            </Container>

        </footer>



    )

}

export default Footer