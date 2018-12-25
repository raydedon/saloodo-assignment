import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import '../stylesheets/style.scss';
import configureStore from './store/configureStore';

let userJSON = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
let initialState = Object.keys(userJSON).length > 0 ? {loggedIn: true, user: userJSON} : {loggedIn: false, user: userJSON};
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));


