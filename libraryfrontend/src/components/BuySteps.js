import React from "react";
import {Nav} from "react-bootstrap";
import { LinkContainer} from 'react-router-bootstrap'

function BuySteps({ step1, step2, step3, step4 }) {
    return(
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'  style={{color: "green"}}>
                        <Nav.Link> Login </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Login </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'  style={{color: "green"}}>
                        <Nav.Link> Address </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Address </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment' style={{color: "green"}}>
                        <Nav.Link> Payment </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Payment </Nav.Link> )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder' style={{color: "green"}}>
                        <Nav.Link> Place Order </Nav.Link>
                    </LinkContainer>
                ) : ( <Nav.Link disabled> Place Order </Nav.Link> )}
            </Nav.Item>

        </Nav>
    )

}

export default BuySteps

