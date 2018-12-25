import {USERS_LOGIN_FAILURE, USERS_LOGIN_REQUEST, USERS_LOGIN_SUCCESS, USERS_LOGOUT} from '../constants/index';
let userJSON = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
let initialState = Object.keys(userJSON).length > 0 ? {loggedIn: true, user: userJSON} : {loggedIn: false, user: userJSON};


export function authentication(state = initialState, action) {
	let {type, payload} = action;
	switch(type) {
		case USERS_LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: payload.user
			};
		case USERS_LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: payload.user
			};
		case USERS_LOGIN_FAILURE:
			return {};
		case USERS_LOGOUT:
			return {};
		default:
			return state;
	}
}