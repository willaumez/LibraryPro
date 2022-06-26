import React, {useRef} from "react";
import {Row, Col, Container, Form} from "react-bootstrap";

function ContactUs() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="7" className="alert alert-success text-center" style={{margin: 50}}><h3>Contact Form</h3>
                </Col>
            </Row>
            <Container style={{}}>
                <Row className="alert alert-success text-center" style={{marginTop: 70}}>
                    <Col className="jumbotron text-center">
                        <div className="text pl-3">
                            <p><i className="fas fa-map-marked-alt fa-2x"></i> .........................................</p>
                        </div>

                        <hr className="my-4"/>
                        <div className="text pl-3">
                            <p><i className="fas fa-phone fa-2x">   :</i>
                                <a href="tel://212696647847">+ 212 696 647 847</a> <a href="tel://212654615359">+ 212 654 615 359</a>
                            </p>
                        </div>
                        <div className="text pl-3">
                            <p><i className="fas fa-at fa-2x">    :</i>
                                <a href="mailto:info@yoursite.com">owanisanajency@gmail.com</a>
                            </p>
                        </div>
                        <div className="text pl-3">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <p><i className="fas fa-globe fa-2x">    :</i> <a href="#">library.com</a></p>
                        </div>
                    </Col>
                </Row>

            </Container>
        </Container>
    )

}

export default ContactUs