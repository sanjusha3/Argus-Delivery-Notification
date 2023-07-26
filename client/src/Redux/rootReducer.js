// index.js
import { combineReducers } from 'redux';
import reducer from './reducers';

const rootReducer = combineReducers({
    app: reducer, // You can rename 'app' to any key that you want to use in your application state to hold the reducer state
});

export default rootReducer;
