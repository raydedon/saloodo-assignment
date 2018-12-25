import {combineReducers} from 'redux';
import addTodoText from './add-todo-text';
import list from './todos';
import editTodoObj from './edit-todo-obj';

const rootReducer = combineReducers({
	addTodoText,
	list,
	editTodoObj,
});

export default rootReducer;