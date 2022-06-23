import React, {useState,useEffect} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {Form, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { listMyOrders } from "../actions/orderActions";
import Notification from "../components/Notifications";

const proxy = '/static'


function DetailsOrderScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver , success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin


    if (!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + (item.price * item.qte), 0).toFixed(2)
    }

//ATITjJDr0ScQYu01lK0JsaSh5TrKmKb_hByB1HdvtJ11_9ULcYBlqqYjU3VobGdx6b8AVGKCwxtHSU13

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=ATITjJDr0ScQYu01lK0JsaSh5TrKmKb_hByB1HdvtJ11_9ULcYBlqqYjU3VobGdx6b8AVGKCwxtHSU13'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!userInfo){ navigate('/login') }

        if (!order || successPay || order._id !== Number(id) || successDeliver){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
            dispatch(listMyOrders())

        } else if(!order.isPaid ) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    },[order, id, dispatch, successPay, successDeliver, userInfo, navigate])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return loading ? ( <Loader/> ) : error ? ( <Notification variant='danger' message={error}/> ):
        (
            <div style={{marginBottom:'8%'}}> <h1> Order:  {order._id} </h1>

                <Row>
                    <Col>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                                <p>
                                    <strong>Shipping: </strong>
                                    {order.shippingAddress.address},    {order.shippingAddress.city},
                                    {"    "} {order.shippingAddress.postalCode}
                                    {"    "}  {order.shippingAddress.country}

                                </p>
                        </ListGroup.Item>
                    </Col>
                    <Col md={3}>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </Col>
                    <Col>
                        <ListGroup.Item>
                            <h4> User :  {order.user.name}</h4>
                            <p> <strong> Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                        </ListGroup.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {order.isDelivered ? (
                            <Message variant='success' cl> Delivered On :  {order.deliveredAt.substring(0, 10)} </Message>
                        ):(  <Message variant='warning'> Not Delivered  </Message>  )}
                    </Col>
                    <Col>
                        {order.isPaid ? (
                            <Message variant='success'> Paid On :  {(order.paidAt).substring(0, 10)} </Message>
                        ):(  <Message variant='warning'> Not Paid  </Message>  )}
                    </Col>
                </Row>
                { loadingDeliver && <Loader /> }
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                    <ListGroup.Item>
                        <Button type='button' className='btn btn-block bg-success'  style={{borderRadius:20}} onClick={deliverHandler}>
                            Mark as Deliver
                        </Button>
                    </ListGroup.Item>
                )}

                <Row style={{padding:'6%'}}>
                    <h3>Order Items</h3>
                        <ListGroup variant='flush' style={{width:'80%', margin:"auto"}}>

                            <ListGroup.Item>
                                {order.orderItems.length === 0 ? <Message variant='info'>
                                    Order is empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row style={{textAlign:"center"}}>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.title} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/book/${item.book}`} className="titre py-0">{item.title}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qte}   X   {item.price}   =    {Number((item.qte * item.price)).toFixed(2)} Dh
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                </Row>
                <Row>
                    <Col>
                      <Card style={{width:'70%', margin:"auto"}} >
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3 className='text-center'>Order Summary</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items:  </Col>
                                        <Col>{order.itemsPrice} Dhs</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:  </Col>
                                        <Col>{order.shippingPrice} Dhs</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:  </Col>
                                        <Col>{order.taxPrice} Dhs</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:  </Col>
                                        <Col>{order.totalPrice} Dhs</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col>
                         {!order.isPaid && (
                             <ListGroup.Item style={{width:'70%', margin:"auto"}}>
                                 {loadingPay && <Loader />}

                                 {!sdkReady ? (
                                     <Loader />
                                 ) : (
                                     <PayPalButton
                                         amount={order.totalPrice}
                                         onSuccess={successPaymentHandler}
                                     />
                                 )}
                             </ListGroup.Item>
                         )}
                    </Col>
                </Row>
            </div>
        )

}

export default DetailsOrderScreen