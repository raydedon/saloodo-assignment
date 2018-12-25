import {EDIT_TODO_INPUT_TEXT_CHANGE, EDIT_TODO_TEXT, CANCEL_EDIT_TODO_TEXT, SAVE_TODO_TEXT} from '../actions/todo-item';

const editTodoObj = (state = '', action) => {
	let {type, payload = {}} = action;
	let {id, text} = payload;
	switch(type) {
		case EDIT_TODO_INPUT_TEXT_CHANGE:
			return {...state, text};
		case EDIT_TODO_TEXT:
			return {id, text};
		case CANCEL_EDIT_TODO_TEXT:
			return {};
		case SAVE_TODO_TEXT:
			return {};
		default:
			return state;
	}
};

export default editTodoObj;