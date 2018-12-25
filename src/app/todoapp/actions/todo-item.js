import {DELETE_REQUEST, ROOT_URL} from '../../utility';

export const EDIT_TODO_INPUT_TEXT_CHANGE = 'EDIT_TODO_INPUT_TEXT_CHANGE';
export const EDIT_TODO_TEXT = 'EDIT_TODO_TEXT';
export const CANCEL_EDIT_TODO_TEXT = 'CANCEL_EDIT_TODO_TEXT';
export const SAVE_TODO_TEXT = 'SAVE_TODO_TEXT';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const onEditTodoTextChange = text => ({
	type: EDIT_TODO_INPUT_TEXT_CHANGE,
	payload: {
		text
	}
});

export const onEditTodoText = (id, text) => ({
	type: EDIT_TODO_TEXT,
	payload: {
		id,
		text
	}
});

export const onCancelEditTodoText = () => ({
	type: CANCEL_EDIT_TODO_TEXT
});

export const onSaveTodoText = (id, text) => ({
	type: SAVE_TODO_TEXT,
	payload: {
		id,
		text
	}
});

export const deleteTodo = (id) => {
	return dispatch => {
		dispatch(deleteTodoRequest(id));
		return fetch(`${ROOT_URL}/todos/${id}`, {
			method: DELETE_REQUEST,
		})
			.then(
				r => r.json(),
				error => {
					console.log('An error occurred.', error);
					dispatch(deleteTodoFailure(id));
				})
			.then(() => dispatch(deleteTodoSuccess(id)))
			.catch(error => {
				console.log('An error occurred.', error);
				dispatch(deleteTodoFailure());
			});
	};
};

export const deleteTodoRequest = (id) => ({
	type: DELETE_TODO_REQUEST,
	payload: {
		id
	}
});

export const deleteTodoSuccess = (id) => ({
	type: DELETE_TODO_SUCCESS,
	payload: {
		id
	}
});

export const deleteTodoFailure = (id) => ({
	type: DELETE_TODO_FAILURE,
	payload: {
		id
	}
});
