import {BAG_BUY_ADD_ITEM,
        BAG_BORROW_ADD_ITEM,
        BAG_BUY_REMOVE_ITEM,
        BAG_BORROW_REMOVE_ITEM,
        BAG_SAVE_SHIPPING_ADDRESS,
        BAG_SAVE_PAYMENT_METHOD,
        BAG_CONFIRM_BORROW,
        BAG_CLEAR_ITEMS,
        } from "../constants/bagConstants";


export const bagBuyReducer = (state={bagBuyItems:[], shippingAddress: {}}, action) => {
    switch (action.type) {
        case BAG_BUY_ADD_ITEM:
            const item = action.payload

            const existItem = state.bagBuyItems.find(x => x.book === item.book)

            if (existItem){
                return {
                    ...state,
                    bagBuyItems: state.bagBuyItems.map(x => x.book === existItem.book ? item : x)
                }
            }else {
                return{
                    ...state,
                    bagBuyItems: [...state.bagBuyItems, item]
                }
            }

        case BAG_BUY_REMOVE_ITEM:
            return {
                ...state,
                bagBuyItems: state.bagBuyItems.filter(x => x.book !== action.payload)
            }

        case BAG_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case BAG_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case BAG_CLEAR_ITEMS:
            return {
                ...state,
                bagBuyItems: []
            }

        default:
            return state

    }
}



export const bagBorrowReducer = (state={bagBorrowItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case BAG_BORROW_ADD_ITEM:
            const item = action.payload

            const existItem = state.bagBorrowItems.find(x => x.book === item.book)

            if (existItem){
                return {
                    ...state,
                    bagBorrowItems: state.bagBorrowItems.map(x => x.book === existItem.book ? item : x)
                }
            }else {
                return{
                    ...state,
                    bagBorrowItems: [...state.bagBorrowItems, item]
                }
            }
        case BAG_BORROW_REMOVE_ITEM:
            return {
                ...state,
                bagBorrowItems: state.bagBorrowItems.filter(x => x.book !== action.payload)
            }

        case BAG_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case BAG_CONFIRM_BORROW:
           return {
               ...state,
               confirmMethod: action.payload
           }

        case BAG_CLEAR_ITEMS:
            return {
                ...state,
                bagBorrowItems: []
            }

        default:
            return state

    }
}