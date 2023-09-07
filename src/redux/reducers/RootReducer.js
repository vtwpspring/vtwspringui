// reducers/index.js

import { combineReducers } from 'redux';
import modalReducer from '../ducks/ModalDuck';

const rootReducer = combineReducers({
    modal: modalReducer,
});

export default rootReducer;