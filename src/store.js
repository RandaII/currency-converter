import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import reducer from "./reducers";

const middleware = () => (dispatch) => (action) =>{
  console.log(action.type)
  console.log(action.payload)
   return dispatch(action)
}

const store = createStore(reducer, applyMiddleware(thunk, middleware));

export default store;