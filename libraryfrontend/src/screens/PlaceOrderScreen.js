import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import BuySteps from "../components/BuySteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const proxy = '/static'


function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const bag = useSelector(state => state.bagBuy)

    bag.itemsPrice = bag.bagBuyItems.reduce((acc, item) => acc + (item.price * item.qteSel), 0).toFixed(2)
    bag.shippingPrice = (bag.itemsPrice > 700 ? 0 :20 ).toFixed(2)
    bag.taxPrice = Number(((0.015) * bag.itemsPrice)).toFixed(2)
    bag.totalPrice = (Number(bag.itemsPrice) + Number(bag.shippingPrice) + Number(bag.taxPrice)).toFixed(2)



    useEffect(() => {
        if (success){
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
        if (!bag.paymentMethod){
        navigate('/payment')
        }
    },[success, navigate, dispatch, bag.paymentMethod, order])

    const placeOrder = () => {
      dispatch(createOrder({
          orderItems: bag.bagBuyItems,
          shippingAddress: bag.shippingAddress,
          paymentMethod: bag.paymentMethod,
          itemsPrice: bag.itemsPrice,
          shippingPrice: bag.shippingPrice,
          taxPrice: bag.taxPrice,
          totalPrice: bag.totalPrice,
      }))
    }

    return(
        <div>
            <BuySteps step1 step2 step3 step4/>
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
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {bag.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {bag.bagBuyItems.length === 0 ? <Message variant='info'>
                                Your bag is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {bag.bagBuyItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={`${proxy}${item.image}`} alt={item.title} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book}`} className="titre py-0">{item.title}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qteSel}   X   {item.price}   =    {Number((item.qteSel * item.price)).toFixed(2)} Dh
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
                                <h3 className='text-center'>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:  </Col>
                                    <Col>{bag.itemsPrice} Dhs</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:  </Col>
                                    <Col>{bag.shippingPrice} Dhs</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:  </Col>
                                    <Col>{bag.taxPrice} Dhs</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:  </Col>
                                    <Col>{bag.totalPrice} Dhs</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'> {error} </Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                 <Button type='button' className='btn-block'
                                style={{ width:'100%', backgroundColor:"green", margin:"auto"}}
                                disabled={bag.bagBuyItems.length === 0}
                                onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default PlaceOrderScreen