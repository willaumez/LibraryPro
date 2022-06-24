import axios from "axios";
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
} from "../constants/userConstants";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ORDER_LIST_MY_RESET, BORROW_LIST_MY_RESET} from "../constants/orderConstants";


export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login/', {'username': email, 'password': password}, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        toast.success('Login Successful...');
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.error(`Login Failed...${error.response.data.detail}`);
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: BORROW_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
    toast.success('Logout Successful...');
}

export const signup = (name, email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_SIGNUP_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/signup/', {
            'name': name,
            'email': email,
            'password': password
        }, config)
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })
         toast.success('Registration Successful...');
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
         toast.success('Login Successful...');
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`Registration Failed...${error.response.data.detail}`);
    }
}

export const createUser = (nameCreate, emailCreate, password, isStaff) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CREATE_REQUEST
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
        const {data} = await axios.post('/api/users/create/', {
            'name': nameCreate,
            'email': emailCreate, 'password': password, 'is_staff': isStaff
        }, config)
        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        })
        toast.success('Successful user creation...');

    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`User creation failed...${error.response.data.detail}`);
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
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
        const {data} = await axios.get(`/api/users/${id}/`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`User Details failed...${error.response.data.detail}`);
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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
        const {data} = await axios.put(`/api/users/profile/update/`, user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        toast.success('Successfully updated user profile...');

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.error(`Failed to update user profile...${error.response.data.detail}`);
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
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
        const {data} = await axios.get(`/api/users/`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`User List failed...${error.response.data.detail}`);
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
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
        const {data} = await axios.delete(`/api/users/delete/${id}/`, config)
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })
        toast.success('Delete user successful...');

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
        toast.warning(`Delete user failed...${error.response.data.detail}`);
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
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
        const {data} = await axios.put(`/api/users/update/${user._id}/`, user, config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        toast.success('Successful user update...');

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
         toast.error(`User update failed...${error.response.data.detail}`);
    }
}



