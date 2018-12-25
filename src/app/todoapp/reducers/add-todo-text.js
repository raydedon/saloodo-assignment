import {ADD_TODO_INPUT_TEXT_CHANGE} from '../actions/add-todo';

const addTodoText = (state = '', action) => {
	let {type, payload = {}} = action;
	let {text} = payload;
	switch(type) {
		case ADD_TODO_INPUT_TEXT_CHANGE:
			return text;
		default:
			return state;
	}
};

export default addTodoText;