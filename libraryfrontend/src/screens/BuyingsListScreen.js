import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Col, Row} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders, deleteOrder } from "../actions/orderActions";
import { USER_UPDATE_RESET, USER_CREATE_RESET, } from "../constants/userConstants";
import { Modal } from "react-bootstrap";
import Notification from "../components/Notifications";

function BuyingListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const bookDelete = useSelector(state => state.bookDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = bookDelete



    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
           dispatch(listOrders())
        }else {
            navigate('/login')
        }

    }, [dispatch, userInfo, navigate])



    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this buying ?')){
            dispatch(deleteOrder(id))
            navigate(`/admin/?key=buying`)
            window.location.reload();
        }
    }


    return(
        <div>
            {loadingDelete && <Loader/>}
            {successDelete && <Notification variant='success' message='Delete Buying Success'/>}


            {errorDelete && <Notification variant='danger' message={errorDelete}/>}
            {error && <Notification variant='danger' message={error}/>}


            {loading ? (<Loader />) : error ? (<Notification variant='danger' message={error}/> ) : (
                <div style={{overflow:'auto', height:'75vh'}}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead style={{tableLayout:"fixed", textAlign:"center", position:"sticky"}}>
                        <tr>
                            <th>USER-NAME</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody style={{overflow:'auto', textAlign:"center"}}>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} dhs</td>
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)) : (
                                        <i className='fas fa-check' style={{color:"red"}}></i>
                                    )}
                                </td>
                                <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)) : (
                                        <i className='fas fa-check' style={{color:"red"}}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className="fas fa-info fa-2x"></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(order._id)}>
                                        <i className='far fa-trash-alt fa-2x'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    {orders.length === 0 && <Message variant='info'> The shopping list is empty </Message>}
                </div>
            )}


        </div>
    )
}

export default BuyingListScreen


