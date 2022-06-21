import React from "react";
import {Nav} from "react-bootstrap";
import { LinkContainer} from 'react-router-bootstrap'

function BorrowSteps({ step1, step2, step3, step4 }) {
    return(
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login' style={{color: "green"}}>
                        <Nav.Link> Login </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Login </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping' style={{color: "green"}}>
                        <Nav.Link> Address </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Address </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/confirm' style={{color: "green"}}>
                        <Nav.Link> Confirm </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Confirm </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeborrow' style={{color: "green"}}>
                        <Nav.Link> Place Borrow </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Place Borrow </Nav.Link> )}
            </Nav.Item>

        </Nav>
    )

}

export default BorrowSteps

