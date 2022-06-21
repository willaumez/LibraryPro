import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { booklistReducers, bookDetailsReducers, bookDeleteReducers, bookCreateReducers, bookUpdateReducers,
        bookReviewCreateReducer, } from "./reducers/bookReducers";
import {bagBuyReducer, bagBorrowReducer} from "./reducers/bagReducers";
import { userLoginReducer, userSignUpReducer, userDetailsReducer, userUpdateProfileReducer,
        userListReducer, userDeleteReducer, userUpdateReducer, userCreateReducer,  } from "./reducers/userReducers";
import { orderCreateReducers, borrowCreateReducers, orderDetailsReducers, borrowDetailsReducers,
        orderPayReducers, borrowTakeReducers, orderListMyReducers, borrowListMyReducers,
        orderListReducers, borrowListReducers, orderDeleteReducers, borrowDeleteReducers,
        orderDeliverReducers, borrowReturnReducers, orderedAddReducers, orderedListMyReducers,
        orderedListReducers, orderedDeleteReducers, } from "./reducers/orderReducers";
import { categoryListReducers, categoryDetailsReducers, categoryUpdateReducers,
        categoryDeleteReducers, categoryCreateReducers, } from "./reducers/categoryReducers";


const reducer = combineReducers({
    bookList: booklistReducers,
    bookDetails: bookDetailsReducers,
    bookDelete: bookDeleteReducers,
    bookCreate: bookCreateReducers,
    bookUpdate: bookUpdateReducers,
    bookReviewCreate: bookReviewCreateReducer,

    bagBuy: bagBuyReducer,
    bagBorrow: bagBorrowReducer,

    userLogin: userLoginReducer,
    userSignUp: userSignUpReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userCreate: userCreateReducer,

    orderCreate: orderCreateReducers,
    orderedAdd: orderedAddReducers,
    orderListMy: orderListMyReducers,
    orderedListMy: orderedListMyReducers,
    orderDetails: orderDetailsReducers,
    orderPay: orderPayReducers,
    orderList: orderListReducers,
    orderedList: orderedListReducers,
    orderDelete: orderDeleteReducers,
    orderedDelete: orderedDeleteReducers,
    orderDeliver: orderDeliverReducers,

    borrowTake: borrowTakeReducers,
    borrowReturn: borrowReturnReducers,
    borrowDetails: borrowDetailsReducers,
    borrowListMy: borrowListMyReducers,
    borrowCreate: borrowCreateReducers,
    borrowList: borrowListReducers,
    borrowDelete: borrowDeleteReducers,

    categoryList: categoryListReducers,
    categoryDetails: categoryDetailsReducers,
    categoryDelete: categoryDeleteReducers,
    categoryCreate: categoryCreateReducers,
    categoryUpdate: categoryUpdateReducers,
})


const bagBuyItemsFromStorage = localStorage.getItem('bagBuyItems') ? JSON.parse(localStorage.getItem('bagBuyItems')) : []
const bagBorrowItemsFromStorage = localStorage.getItem('bagBorrowItems') ? JSON.parse(localStorage.getItem('bagBorrowItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    bagBuy: {bagBuyItems: bagBuyItemsFromStorage,
            shippingAddress: shippingAddressFromStorage,},
    bagBorrow: {bagBorrowItems: bagBorrowItemsFromStorage,
                shippingAddress: shippingAddressFromStorage,},
    userLogin: { userInfo: userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

