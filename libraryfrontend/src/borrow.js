import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


const reducer = combineReducers({})
const initialState = {}
const middleware = [thunk]

const borrow = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default borrow

