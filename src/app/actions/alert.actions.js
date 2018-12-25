import {ALERT_SUCCESS, ALERT_CLEAR, ALERT_ERROR} from '../constants';

export function successAlert(message) {
	return {
		type: ALERT_SUCCESS,
		payload: {
			message
		}
	};
}

export function errorAlert(message) {
	return {
		type: ALERT_ERROR,
		payload: {
			message
		}
	};
}

export function clearAlert() {
	return {type: ALERT_CLEAR};
}