import {createStore} from 'redux';
import reducer from "./reducers";

// const middleware = () => (dispatch) => (action) =>{
//   console.log(action.type)
//   console.log(action.payload)
//    return dispatch(action)
// }

const store = createStore(reducer);

export default store;