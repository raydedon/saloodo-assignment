import {USERS_GETALL_FAILURE, USERS_GETALL_REQUEST, USERS_GETALL_SUCCESS} from '../constants';

export function users(state = {}, action) {
	switch(action.type) {
		case USERS_GETALL_REQUEST:
			return {
				loading: true
			};
		case USERS_GETALL_SUCCESS:
			return {
				items: action.users
			};
		case USERS_GETALL_FAILURE:
			return {
				error: action.error
			};
		default:
			return state;
	}
}