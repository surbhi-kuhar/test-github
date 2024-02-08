import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
   userReducer: userReducer
});

const initialState = {user:{}};
//const middleware = [thunk];

const store = createStore(
    reducer,
    initialState
);

export default store;
