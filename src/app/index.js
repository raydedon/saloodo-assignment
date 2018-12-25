import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {Provider} from 'react-redux';
import '../stylesheets/style.scss';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));


