import {EDIT_TODO_INPUT_TEXT_CHANGE} from '../actions/todo-item';

const editTodoText = (state = '', action) => {
	let {type, payload = {}} = action;
	let {text} = payload;
	switch(type) {
		case EDIT_TODO_INPUT_TEXT_CHANGE:
			return text;
		default:
			return state;
	}
};

export default editTodoText;