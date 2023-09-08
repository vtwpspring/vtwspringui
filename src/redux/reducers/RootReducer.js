// reducers/index.js

import { combineReducers } from 'redux';
import modalReducer from '../ducks/ModalDuck';
import singupReducer from "../ducks/SignupDuck";

const rootReducer = combineReducers({
    modal: modalReducer,
    signup: singupReducer
});

export default rootReducer;