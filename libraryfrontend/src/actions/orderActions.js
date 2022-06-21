import axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
        BORROW_CREATE_REQUEST, BORROW_CREATE_SUCCESS, BORROW_CREATE_FAIL,
        ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
        BORROW_DETAILS_REQUEST, BORROW_DETAILS_SUCCESS, BORROW_DETAILS_FAIL,
        ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET,
        BORROW_TAKE_REQUEST, BORROW_TAKE_SUCCESS, BORROW_TAKE_FAIL, BORROW_TAKE_RESET,
        ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_RESET,
        BORROW_LIST_MY_REQUEST, BORROW_LIST_MY_SUCCESS, BORROW_LIST_MY_FAIL,
        ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
        BORROW_LIST_REQUEST, BORROW_LIST_SUCCESS, BORROW_LIST_FAIL,
        ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
        BORROW_DELETE_REQUEST, BORROW_DELETE_SUCCESS, BORROW_DELETE_FAIL,
        ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,
        BORROW_RETURN_REQUEST, BORROW_RETURN_SUCCESS, BORROW_RETURN_FAIL,
        ORDERED_ADD_REQUEST, ORDERED_ADD_SUCCESS, ORDERED_ADD_FAIL, ORDERED_ADD_RESET,
        ORDERED_LIST_MY_REQUEST, ORDERED_LIST_MY_SUCCESS, ORDERED_LIST_MY_FAIL,
        ORDERED_LIST_REQUEST, ORDERED_LIST_SUCCESS, ORDERED_LIST_FAIL,
        ORDERED_DELETE_REQUEST, ORDERED_DELETE_SUCCESS, ORDERED_DELETE_FAIL, ORDERED_DELETE_RESET,
        } from "../constants/orderConstants";
import { BAG_CLEAR_ITEMS } from "../constants/bagConstants";

export const deleteOrdered = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDERED_DELETE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.delete(`/api/orders/ordered/delete/${id}/`, config)
                dispatch({
                        type: ORDERED_DELETE_SUCCESS,
                })


        }catch (error){
                dispatch({
                    type: ORDERED_DELETE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listMyOrdered = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDERED_LIST_MY_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/orders/ordered/myordered/`, config)
                dispatch({
                        type: ORDERED_LIST_MY_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDERED_LIST_MY_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listOrdered = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDERED_LIST_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/orders/ordered/`, config)
                dispatch({
                        type: ORDERED_LIST_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDERED_LIST_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}




export const addOrdered = (ordered) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDERED_ADD_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.post(`/api/orders/ordered/add/` ,ordered, config)
                dispatch({
                        type: ORDERED_ADD_SUCCESS,
                        payload: data
                })

        }catch (error){
                dispatch({
                    type: ORDERED_ADD_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}


export const takeBorrow = (borrow) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_TAKE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.put(`/api/borrows/${borrow._id}/take/`, {}, config)
                dispatch({
                        type: BORROW_TAKE_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: BORROW_TAKE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const returnBorrow = (borrow) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_RETURN_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.put(`/api/borrows/${borrow._id}/return/`, {}, config)
                dispatch({
                        type: BORROW_RETURN_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: BORROW_RETURN_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_DELIVER_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.put(`/api/orders/${order._id}/deliver/`, {}, config)
                dispatch({
                        type: ORDER_DELIVER_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDER_DELIVER_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}




export const deleteOrder = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_DELETE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.delete(`/api/orders/delete/${id}/`, config)
                dispatch({
                        type: ORDER_DELETE_SUCCESS,
                })


        }catch (error){
                dispatch({
                    type: ORDER_DELETE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}
export const deleteBorrow = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_DELETE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.delete(`/api/borrows/delete/${id}/`, config)
                dispatch({
                        type: BORROW_DELETE_SUCCESS,
                })


        }catch (error){
                dispatch({
                    type: BORROW_DELETE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}


export const createOrder = (order) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_CREATE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.post(`/api/orders/add/` ,order, config)
                dispatch({
                        type: ORDER_CREATE_SUCCESS,
                        payload: data
                })

                dispatch({
                        type: BAG_CLEAR_ITEMS,
                        payload: data
                })
                localStorage.removeItem('bagBuyItems')


        }catch (error){
                dispatch({
                    type: ORDER_CREATE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_DETAILS_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/orders/${id}/`, config)
                dispatch({
                        type: ORDER_DETAILS_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDER_DETAILS_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const payOrder = (id, payementResult) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_PAY_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.put(`/api/orders/${id}/pay/`, payementResult, config)
                dispatch({
                        type: ORDER_PAY_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDER_PAY_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listMyOrders = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_LIST_MY_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/orders/myorders/`, config)
                dispatch({
                        type: ORDER_LIST_MY_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDER_LIST_MY_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listOrders = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: ORDER_LIST_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/orders/`, config)
                dispatch({
                        type: ORDER_LIST_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: ORDER_LIST_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}




export const createBorrow = (borrow) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_CREATE_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.post(`/api/borrows/add/` ,borrow, config)
                dispatch({
                        type: BORROW_CREATE_SUCCESS,
                        payload: data
                })
                dispatch({
                        type: BAG_CLEAR_ITEMS,
                        payload: data
                })
                localStorage.removeItem('bagBorrowItems')


        }catch (error){
                dispatch({
                    type: BORROW_CREATE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const getBorrowDetails = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_DETAILS_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/borrows/${id}/`, config)
                dispatch({
                        type: BORROW_DETAILS_SUCCESS,
                        payload: data
                })

        }catch (error){
                dispatch({
                    type: BORROW_DETAILS_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listMyBorrows = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_LIST_MY_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/borrows/myborrows/`, config)
                dispatch({
                        type: BORROW_LIST_MY_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: BORROW_LIST_MY_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const listBorrows = () => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BORROW_LIST_REQUEST
                })
                const {
                        userLogin: { userInfo },
                } = getState()

                const config ={
                        headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${userInfo.token}`
                        }
                }
                const {data} = await axios.get(`/api/borrows/`, config)
                dispatch({
                        type: BORROW_LIST_SUCCESS,
                        payload: data
                })


        }catch (error){
                dispatch({
                    type: BORROW_LIST_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}







