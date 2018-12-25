import {ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS} from '../constants';

export function alert(state = {}, action) {
	let {type, payload} = action;
	switch(type) {
		case ALERT_SUCCESS:
			return {
				type: 'alert-success',
				message: payload.message
			};
		case ALERT_ERROR:
			return {
				type: 'alert-error',
				message: payload.message
			};
		case ALERT_CLEAR:
			return {};
		default:
			return state;
	}
}