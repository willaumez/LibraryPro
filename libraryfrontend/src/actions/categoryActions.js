import {
    CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL,
    CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL,
    CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL,
    CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL,
} from "../constants/categoryConstante";
import React from 'react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export const listCategories = () => async (dispatch) => {
    try {
        dispatch({type: CATEGORY_LIST_REQUEST})

        const {data} = await axios.get(`/api/category`)

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.error(`List Category Fail...${error.response.data.detail}`);
    }
}

export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: CATEGORY_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/category/${id}`)

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`Details Category Fail...${error.response.data.detail}`);
    }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        })
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`/api/category/delete/${id}/`, config)
        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        })

        toast.success('Category Deleted Successfully');


    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.error(`Deletion of category failed...${error.response.data.detail}`);
    }
}

export const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`/api/category/create`, category, config)
        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        })

        toast.success('The Creation of the Category Succeeded');


    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
toast.error(`Creation of category failed...${error.response.data.detail}`);

    }
}

export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
        })
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/category/update/${category._id}/`, category, config)
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })
        toast.success('Update Category Succeeded');

    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.error(`Update Category fail...${error.response.data.detail}`);
    }
}






