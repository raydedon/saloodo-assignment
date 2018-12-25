import {ROOT_URL} from '../constants/index';
import {authHeader} from '../helpers/index';

export const userService = {
	login,
	logout,
	getAll,
	register
};

function login(userName, password) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({userName, password})
	};

	return fetch(`${ROOT_URL}/api/auth/login`, requestOptions)
		.then(res => res.json())
		.then(user => {
			// login successful if there's a jwt token in the response
			if(user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
}

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(user)
	};

	return fetch(`${ROOT_URL}/api/auth/register`, requestOptions)
		.then(res => res.json())
		.then(result => {
			return result;
		});
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch(`${ROOT_URL}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok) {
			if(response.status === 401) {
				// auto logout if 401 response returned from api
				logout();
				location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}