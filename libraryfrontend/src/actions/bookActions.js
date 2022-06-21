import axios from "axios";
import { BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
        BOOK_DETAILS_REQUEST, BOOK_DETAILS_SUCCESS, BOOK_DETAILS_FAIL,
        BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_DELETE_FAIL,
        BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_CREATE_FAIL, BOOK_CREATE_RESET,
        BOOK_UPDATE_REQUEST, BOOK_UPDATE_SUCCESS, BOOK_UPDATE_FAIL, BOOK_UPDATE_RESET,
        BOOK_CREATE_REVIEW_REQUEST, BOOK_CREATE_REVIEW_SUCCESS, BOOK_CREATE_REVIEW_FAIL, BOOK_CREATE_REVIEW_RESET,
        } from "../constants/bookConstants";


export const listBooks = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: BOOK_LIST_REQUEST })

        const { data } = await axios.get(`/api/books${keyword}`)

        dispatch({
            type: BOOK_LIST_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: BOOK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const listBookDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/books/${id}`)

        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }

}

export const deleteBook = (id) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BOOK_DELETE_REQUEST
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
                const {data} = await axios.delete(`/api/books/delete/${id}/`, config)
                dispatch({
                        type: BOOK_DELETE_SUCCESS,
                })


        }catch (error){
                dispatch({
                    type: BOOK_DELETE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const createBook = (book) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BOOK_CREATE_REQUEST
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
                const {data} = await axios.post(`/api/books/create`,book, config)
                dispatch({
                        type: BOOK_CREATE_SUCCESS,
                        payload:data,
                })

        }catch (error){
                dispatch({
                    type: BOOK_CREATE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const updateBook = (book) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BOOK_UPDATE_REQUEST
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
                const {data} = await axios.put(`/api/books/update/${book._id}/`,book, config)
                dispatch({
                        type: BOOK_UPDATE_SUCCESS,
                        payload:data,
                })

                dispatch({
                    type: BOOK_DETAILS_SUCCESS,
                    payload:data
                })

        }catch (error){
                dispatch({
                    type: BOOK_UPDATE_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

export const createBookReview = (bookId, review) => async (dispatch, getState) => {
        try {
                dispatch({
                        type: BOOK_CREATE_REVIEW_REQUEST
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
                const {data} = await axios.post(`/api/books/${bookId}/reviews/`, review, config)
                dispatch({
                        type: BOOK_CREATE_REVIEW_SUCCESS,
                        payload:data,
                })

        }catch (error){
                dispatch({
                    type: BOOK_CREATE_REVIEW_FAIL,
                    payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                 })
        }
}

