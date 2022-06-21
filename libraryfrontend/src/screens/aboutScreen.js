import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

function About() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="7" className="alert alert-success text-center" style={{margin: 50}}><h3>About-Us</h3></Col>
            </Row>
            <Row className="alert alert-success text-center" style={{marginTop: 70}}>
                <Col className="jumbotron text-center">
                    <h1 className="display-4">Hello, Reader!</h1>
                    <p className="lead">
                        This project is carried out by three students from E.M.S.I (Moroccan School of Engineering
                        Sciences)
                        in 3rd I.I.R (COMPUTER ENGINEERING AND NETWORKS), who are OWANI-SANA, ELHARDI Khadija and Habib
                        Tanou .
                        The project was supervised by Ms Zineb HIDILA our professor in Web Development in Python..
                    </p>
                    <hr className="my-4"/>
                    <LinkContainer to='/contactUS'>
                        <div>
                            <h5> You can contact Us...</h5> <i className="fas fa-link fa-2x"></i>
                        </div>

                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    )

}

export default About