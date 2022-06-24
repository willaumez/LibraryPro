import { BAG_BUY_ADD_ITEM, BAG_BORROW_ADD_ITEM, BAG_BORROW_REMOVE_ITEM, BAG_BUY_REMOVE_ITEM,
        BAG_SAVE_SHIPPING_ADDRESS, BAG_SAVE_PAYMENT_METHOD, BAG_CONFIRM_BORROW,} from "../constants/bagConstants";
import axios from "axios";
import { CurrentDate, LimitDate } from "../components/DatesTimes";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addToBuyBag = (id, qteSel) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/books/${id}`)

    dispatch({
        type:BAG_BUY_ADD_ITEM,
        payload:{
            book: data._id,
            title: data.title,
            image: data.image,
            price: data.price,
            qte: data.qte,
            qteSel,
        }
    })
    localStorage.setItem('bagBuyItems',JSON.stringify(getState().bagBuy.bagBuyItems))
     toast.success('Book Add to shopping cart');
}

export const removeFromBagBuy = (id) => (dispatch,getState) => {
    dispatch({
        type: BAG_BUY_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('bagBuyItems',JSON.stringify(getState().bagBuy.bagBuyItems))
    toast.success('Book Remove from shopping cart');
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: BAG_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: BAG_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}


export const saveConfirmBorrow = (data) => (dispatch) => {
    dispatch({
        type: BAG_CONFIRM_BORROW,
        payload: data,
    })
    localStorage.setItem('confirmMethod',JSON.stringify(data))
}



export const addToBorrowBag = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/books/${id}`)

    dispatch({
        type:BAG_BORROW_ADD_ITEM,
        payload:{
            book: data._id,
            title: data.title,
            image: data.image,
            currentDate: CurrentDate(),
            limitDate: LimitDate(),
        }
    })
    localStorage.setItem('bagBorrowItems',JSON.stringify(getState().bagBorrow.bagBorrowItems))
    toast.success('Book Add to borrowing basket');
}

export const removeFromBagBorrow = (id) => (dispatch,getState) => {
    dispatch({
        type: BAG_BORROW_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('bagBorrowItems',JSON.stringify(getState().bagBorrow.bagBorrowItems))
    toast.success('Book Remove from borrowing basket');
}
