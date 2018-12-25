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
import {clearAlert, errorAlert, successAlert} from './alert.actions';

export function registerUser(user, history) {
	return dispatch => {
		let {userName = '', password = ''} = user;
		if(userName.length === 0 || password.length === 0) dispatch(errorAlert('userName and password is mandatory'));

		dispatch(request());
		userService.register(user)
			.then(
				result => {
					dispatch(successAlert(result.message));
					setTimeout(() => dispatch(clearAlert()), 1000);
					dispatch(success(result));
					history.push('/');
				},
				error => {
					dispatch(failure(error));
					dispatch(errorAlert(error));
					setTimeout(() => dispatch(clearAlert()), 1000);
				}
			);
	};

	function request() { return {type: USERS_LOGIN_REQUEST}; }
	function success(result) { return {type: USERS_LOGIN_SUCCESS, payload: {result}}; }
	function failure(error) { return {type: USERS_LOGIN_FAILURE, payload: {error}}; }
}

export function userLogin(username, password, history) {
	return dispatch => {
		dispatch(request({username}));

		userService.login(username, password)
			.then(
				user => {
					dispatch(success(user));
					dispatch(successAlert(`Welcome ${user.name}`));
					setTimeout(() => dispatch(clearAlert()), 1000);
					history.push('/');
				},
				error => {
					dispatch(failure(error));
					dispatch(errorAlert(error));
					setTimeout(() => dispatch(clearAlert()), 1000);
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