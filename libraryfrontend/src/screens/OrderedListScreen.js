import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Table, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listMyOrdered, listOrdered} from "../actions/orderActions";
import { deleteOrdered } from "../actions/orderActions";
import {deleteUser, getUserDetails, listUsers} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";
import Notification from "../components/Notifications";

function OrderedListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderedList = useSelector(state => state.orderedList)
    const {loading, error, ordered} = orderedList

    const orderedDelete = useSelector(state => state.orderedDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderedDelete


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrdered())
            if (successDelete){
                navigate('#')
            }
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, successDelete, userInfo])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user ?')){
            dispatch(deleteOrdered(id))
            dispatch(listMyOrdered())
            dispatch(listOrdered())

        }
    }


    return (
        <div>

            {loadingDelete && <Loader/>}
            {loading && <Loader/>}
            {successDelete && <Notification variant='success' message='Delete Ordered Success'/>}


            {errorDelete && <Notification variant='danger' message={errorDelete}/>}
            {error && <Notification variant='danger' message={error}/>}

            {loading ? (<Loader/>) : error ? (<Notification variant='danger' message={error}/>) : (
                <div style={{overflow:'auto', height:'75vh'}}>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead style={{tableLayout:"fixed", textAlign:"center", position:"sticky"}}>
                    <tr>
                        <th>User-Name</th>
                        <th>User-Email</th>
                        <th>Book-Title</th>
                        <th>Book-Author</th>
                        <th>Date-Order</th>
                    </tr>
                    </thead>
                    <tbody style={{overflow:'auto', textAlign:"center"}}>
                    {ordered.map(order => (
                        <tr key={order._id}>
                            <td>{order.userName}</td>
                            <td>{order.userEmail}</td>
                            <td>{order.bookTitle}</td>
                            <td>{order.bookAuthor}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(order._id)}>
                                    <i className='far fa-trash-alt fa-2x'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                    {ordered.length === 0 && <Message variant='info'>Orders list is empty </Message>}
                </div>
            )}
        </div>
    )

}

export default OrderedListScreen