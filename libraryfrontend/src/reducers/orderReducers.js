import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET,
        BORROW_CREATE_REQUEST, BORROW_CREATE_SUCCESS, BORROW_CREATE_FAIL, BORROW_CREATE_RESET,
        ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
        BORROW_DETAILS_REQUEST, BORROW_DETAILS_SUCCESS, BORROW_DETAILS_FAIL,
        ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET,
        BORROW_TAKE_REQUEST, BORROW_TAKE_SUCCESS, BORROW_TAKE_FAIL, BORROW_TAKE_RESET,
        ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_RESET,
        BORROW_LIST_MY_REQUEST, BORROW_LIST_MY_SUCCESS, BORROW_LIST_MY_FAIL, BORROW_LIST_MY_RESET,
        ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
        BORROW_LIST_REQUEST, BORROW_LIST_SUCCESS, BORROW_LIST_FAIL,
        ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
        BORROW_DELETE_REQUEST, BORROW_DELETE_SUCCESS, BORROW_DELETE_FAIL,
        ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET,
        BORROW_RETURN_REQUEST, BORROW_RETURN_SUCCESS, BORROW_RETURN_FAIL, BORROW_RETURN_RESET,
        ORDERED_ADD_REQUEST, ORDERED_ADD_SUCCESS, ORDERED_ADD_FAIL, ORDERED_ADD_RESET,
        ORDERED_LIST_MY_REQUEST, ORDERED_LIST_MY_SUCCESS, ORDERED_LIST_MY_FAIL, ORDERED_LIST_MY_RESET,
        ORDERED_LIST_REQUEST, ORDERED_LIST_SUCCESS, ORDERED_LIST_FAIL,
        ORDERED_DELETE_REQUEST, ORDERED_DELETE_SUCCESS, ORDERED_DELETE_FAIL, ORDERED_DELETE_RESET,} from "../constants/orderConstants";
import {BOOK_DELETE_FAIL, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS} from "../constants/bookConstants";


export const orderedDeleteReducers = ( state = { },  action) => {
    switch (action.type) {
        case ORDERED_DELETE_REQUEST:
            return { loading: true }

        case ORDERED_DELETE_SUCCESS:
            return { loading: false, success:true }

        case ORDERED_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }

}

export const orderedAddReducers = (state = {}, action) => {
    switch (action.type){
        case ORDERED_ADD_REQUEST :
            return{
                loading: true
            }

        case ORDERED_ADD_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDERED_ADD_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDERED_ADD_RESET:
            return { }

        default:
            return state
    }
}

export const orderedListMyReducers = (state = { ordered:[] }, action) => {
    switch (action.type){
        case ORDERED_LIST_MY_REQUEST :
            return{
                loading: true
            }

        case ORDERED_LIST_MY_SUCCESS:
            return {
                loading: false,
                ordered: action.payload
            }

        case ORDERED_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDERED_LIST_MY_RESET:
            return { ordered: [] }

        default:
            return state
    }
}

export const orderedListReducers = (state = { ordered:[] }, action) => {
    switch (action.type){
        case ORDERED_LIST_REQUEST :
            return{
                loading: true
            }

        case ORDERED_LIST_SUCCESS:
            return {
                loading: false,
                ordered: action.payload
            }

        case ORDERED_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}



export const orderDeliverReducers = (state = {}, action) => {
    switch (action.type){
        case ORDER_DELIVER_REQUEST :
            return{
                loading: true
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}
export const borrowTakeReducers = (state = {}, action) => {
    switch (action.type){
        case BORROW_TAKE_REQUEST :
            return{
                loading: true
            }

        case BORROW_TAKE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case BORROW_TAKE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case BORROW_TAKE_RESET:
            return {}

        default:
            return state
    }
}
export const borrowReturnReducers = (state = {}, action) => {
    switch (action.type){
        case BORROW_RETURN_REQUEST :
            return{
                loading: true
            }

        case BORROW_RETURN_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case BORROW_RETURN_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case BORROW_RETURN_RESET:
            return {}

        default:
            return state
    }
}


export const orderCreateReducers = (state = {}, action) => {
    switch (action.type){
        case ORDER_CREATE_REQUEST :
            return{
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_CREATE_RESET:
            return { }

        default:
            return state
    }
}

export const orderDetailsReducers = (state = {loading:true, orderItems: [], shippingAddress:{}}, action) => {
    switch (action.type){
        case ORDER_DETAILS_REQUEST :
            return{
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const orderPayReducers = (state = {}, action) => {
    switch (action.type){
        case ORDER_PAY_REQUEST :
            return{
                loading: true
            }

        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_PAY_RESET:
            return {}

        default:
            return state
    }
}

export const orderListMyReducers = (state = { orders:[] }, action) => {
    switch (action.type){
        case ORDER_LIST_MY_REQUEST :
            return{
                loading: true
            }

        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_LIST_MY_RESET:
            return { orders: [] }

        default:
            return state
    }
}

export const orderListReducers = (state = { orders:[] }, action) => {
    switch (action.type){
        case ORDER_LIST_REQUEST :
            return{
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderDeleteReducers = ( state = { },  action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true }

        case ORDER_DELETE_SUCCESS:
            return { loading: false, success:true }

        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }

}

export const borrowDeleteReducers = ( state = { },  action) => {
    switch (action.type) {
        case BORROW_DELETE_REQUEST:
            return { loading: true }

        case BORROW_DELETE_SUCCESS:
            return { loading: false, success:true }

        case BORROW_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }

}



export const borrowCreateReducers = (state = {}, action) => {
    switch (action.type){
        case BORROW_CREATE_REQUEST:
            return{
                loading: true
            }

        case BORROW_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                borrow: action.payload
            }

        case BORROW_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case BORROW_CREATE_RESET:
            return { }

        default:
            return state
    }
}

export const borrowDetailsReducers = (state = {loading:true, borrowItems: [], borrowAddress:{}}, action) => {
    switch (action.type){
        case BORROW_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }

        case BORROW_DETAILS_SUCCESS:
            return {
                loading: false,
                borrow: action.payload
            }

        case BORROW_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const borrowListMyReducers = (state = { borrows:[] }, action) => {
    switch (action.type){
        case BORROW_LIST_MY_REQUEST :
            return{
                loading: true
            }

        case BORROW_LIST_MY_SUCCESS:
            return {
                loading: false,
                borrows: action.payload
            }

        case BORROW_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case BORROW_LIST_MY_RESET:
            return { borrows: [] }

        default:
            return state
    }
}

export const borrowListReducers = (state = { borrows:[] }, action) => {
    switch (action.type){
        case BORROW_LIST_REQUEST :
            return{
                loading: true
            }

        case BORROW_LIST_SUCCESS:
            return {
                loading: false,
                borrows: action.payload
            }

        case BORROW_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}




