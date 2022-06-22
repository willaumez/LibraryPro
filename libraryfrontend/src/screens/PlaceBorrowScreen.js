import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import BorrowSteps from "../components/BorrowSteps";
import Message from "../components/Message";
import {CodeVerif} from "../components/CodeVerif";
import { CurrentDate, LimitDate} from "../components/DatesTimes";
import { createBorrow } from "../actions/orderActions";
import { BORROW_CREATE_RESET } from "../constants/orderConstants";

const proxy = '/static'


function PlaceBorrowScreen() {
    const borrowCreate = useSelector(state => state.borrowCreate)
    const { borrow, error, success } = borrowCreate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const bag = useSelector(state => state.bagBorrow)

    bag.currentDate = CurrentDate()
    bag.limitDate = LimitDate()
    bag.codeVerif = CodeVerif()

    useEffect(() => {
        if (!bag.confirmMethod){
        navigate('/confirm')
        }
        if (success){
            navigate(`/borrow/${borrow._id}`)
            dispatch({ type: BORROW_CREATE_RESET })
        }
    },[success, navigate, dispatch, bag.paymentMethod, bag._id, bag.confirmMethod, borrow._id])

    const placeBorrow = () => {
      dispatch(createBorrow({
          borrowItems: bag.bagBorrowItems,
          shippingAddress: bag.shippingAddress,
          paymentMethod: bag.confirmMethod,
          currentDate: bag.currentDate,
          limitDate: bag.limitDate,
          codeVerif: bag.codeVerif,
      }))
    }

    return(
        <div>
            <BorrowSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Shipping: </strong>
                                {bag.shippingAddress.address},    {bag.shippingAddress.city},
                                {"    "}
                                {bag.shippingAddress.postalCode},
                                {"    "}
                                {bag.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Confirm Selection ? </h5>
                            <p>
                                <strong>Method: </strong>
                                {bag.confirmMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Items Selected</h3>
                            {bag.bagBorrowItems.length === 0 ? <Message variant='info'>
                                Your bag is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {bag.bagBorrowItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={`${proxy}${item.image}`} alt={item.title} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book}`} className="titre py-0">{item.title}</Link>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card style={{marginTop:'5%'}}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3 className='text-center'>Borrow Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:  </Col>
                                    <Col>{bag.bagBorrowItems.length} item(s)</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Current Date:  </Col>
                                    <Col>{ bag.currentDate} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Limit Date:  </Col>
                                    <Col>{ bag.limitDate} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                 <Button type='button' className='btn-block'
                                style={{ width:'100%', backgroundColor:"green", margin:"auto"}}
                                disabled={ bag.bagBorrowItems.length === 0}
                                onClick={placeBorrow}
                                >
                                    Place Borrow
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default PlaceBorrowScreen