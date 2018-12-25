import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../todoapp/reducers/index';
import thunk from 'redux-thunk';

// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState = {}) {
	return createStore(rootReducer, initialState, enhancer);
}
