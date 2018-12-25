import {POST_REQUEST, ROOT_URL} from '../../utility';

export const ADD_TODO = 'ADD_TODO';
export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';
export const ADD_TODO_INPUT_TEXT_CHANGE = 'ADD_TODO_INPUT_TEXT_CHANGE';
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';


export function createTodo(text) {
	return dispatch => {
		dispatch(createTodoRequest());

		return fetch(`${ROOT_URL}/todos`, {
			body: JSON.stringify({text}),
			method: POST_REQUEST,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(
				r => r.json(),
				error => {
					console.log('An error occurred.', error);
					dispatch(createTodoFailure());
				})
			.then(r => dispatch(createTodoSuccess(r)));
	};
}

export const createTodoRequest = () => ({
	type: CREATE_TODO_REQUEST
});

export const createTodoSuccess = ({_id, text, completed}) => {
	return {
		type: CREATE_TODO_SUCCESS,
		payload: {
			id: _id,
			text,
			completed
		}
	};
};

export const createTodoFailure = () => ({
	type: CREATE_TODO_FAILURE
});

export const onAddTodoTextChange = text => ({
	type: ADD_TODO_INPUT_TEXT_CHANGE,
	payload: {
		text
	}
});

export function fetchTodos() {
	return dispatch => {
		dispatch(fetchTodosRequest());

		return fetch(`${ROOT_URL}/todos`)
			.then(
				r => r.json(),
				error => {
					console.log('An error occurred.', error);
					dispatch(fetchTodosFailure());
				})
			.then(r => dispatch(fetchTodosSuccess(r)));
	};
}

export const fetchTodosRequest = () => ({
	type: FETCH_TODOS_REQUEST
});

export const fetchTodosSuccess = (list) => {
	return {
		type: FETCH_TODOS_SUCCESS,
		payload: {
			list
		}
	};
};

export const fetchTodosFailure = () => ({
	type: FETCH_TODOS_FAILURE
});
