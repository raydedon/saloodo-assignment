import {USERS_GETALL_SUCCESS} from '../constants';

export function users(state = [], action) {
	let {type, payload} = action;
	switch(type) {
		case USERS_GETALL_SUCCESS: {
			let {users = []} = payload;
			return users;
		}
		default:
			return state;
	}
}