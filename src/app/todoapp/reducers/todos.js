import {TODO_MARK_COMPLETED_SUCCESS} from '../actions';
import {ADD_TODO, CREATE_TODO_SUCCESS, FETCH_TODOS_SUCCESS} from '../actions/add-todo';
import {DELETE_TODO_SUCCESS, SAVE_TODO_TEXT} from '../actions/todo-item';

const list = (state = [], action) => {
	let {type, payload = {}} = action;
	let {text = '', id, list = [], completed = false} = payload;
	switch(type) {
		case CREATE_TODO_SUCCESS:
			return [...state, {text, completed, id}];
		case ADD_TODO:
			return [...state, {text, completed, id}];
		case TODO_MARK_COMPLETED_SUCCESS:
			return state.map(i => {
				return i.id === id ? {...i, completed: !i.completed} : i;
			});
		case SAVE_TODO_TEXT:
			return state.map(i => {
				return i.id === id ? {...i, text} : i;
			});
		case FETCH_TODOS_SUCCESS:
			return list;
		case DELETE_TODO_SUCCESS:
			return state.filter(i => i.id !== id);
		default:
			return state;
	}
};

export default list;