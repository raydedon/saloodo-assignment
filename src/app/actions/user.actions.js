import {
	USERS_GETALL_REQUEST,
	USERS_GETALL_SUCCESS,
	USERS_GETALL_FAILURE,
	USERS_LOGIN_FAILURE,
	USERS_LOGIN_REQUEST,
	USERS_LOGIN_SUCCESS,
	USERS_LOGOUT
} from '../constants';
import {userService} from '../services/user.service';
import {alertError} from './alert.actions';
import {history} from '../helpers';

export function userLogin(username, password) {
	return dispatch => {
		dispatch(request({username}));

		userService.login(username, password)
			.then(
				user => {
					dispatch(success(user));
					history.push('/');
				},
				error => {
					dispatch(failure(error));
					dispatch(alertError(error));
				}
			);
	};

	function request(user) { return {type: USERS_LOGIN_REQUEST, payload: {user}}; }
	function success(user) { return {type: USERS_LOGIN_SUCCESS, payload: {user}}; }
	function failure(error) { return {type: USERS_LOGIN_FAILURE, payload: {error}}; }
}

export function userLogout() {
	userService.logout();
	return {type: USERS_LOGOUT};
}

export function getAllUser() {
	return dispatch => {
		dispatch(request());

		userService.getAll()
			.then(
				users => dispatch(success(users)),
				error => dispatch(failure(error))
			);
	};

	function request() { return {type: USERS_GETALL_REQUEST}; }
	function success(users) { return {type: USERS_GETALL_SUCCESS, payload: {users}}; }
	function failure(error) { return {type: USERS_GETALL_FAILURE, payload: {error}}; }
}