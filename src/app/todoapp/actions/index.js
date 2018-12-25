import {PUT_REQUEST, ROOT_URL} from '../../utility';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TODO_MARK_COMPLETED_REQUEST = 'TODO_MARK_COMPLETED_REQUEST';
export const TODO_MARK_COMPLETED_SUCCESS = 'TODO_MARK_COMPLETED_SUCCESS';
export const TODO_MARK_COMPLETED_FAILURE = 'TODO_MARK_COMPLETED_FAILURE';


export const setVisibilityFilter = filter => ({
	type: SET_VISIBILITY_FILTER,
	payload: {
		filter
	}
});

export const markCompleted = (id, completed) => {
	return dispatch => {
		dispatch(markCompletedRequest());

		return fetch(`${ROOT_URL}/todos/${id}`, {
			body: JSON.stringify({completed}),
			method: PUT_REQUEST,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(
				r => r.json(),
				error => {
					console.log('An error occurred.', error);
					dispatch(markCompletedFailure());
				})
			.then(r => {
				dispatch(markCompletedSuccess(r));
			})
			.catch(error => {
				console.log('An error occurred.', error);
				dispatch(markCompletedFailure());
			});
	};
};

const markCompletedRequest = () => ({
	type: TODO_MARK_COMPLETED_REQUEST
});

const markCompletedSuccess = (todo) => ({
	type: TODO_MARK_COMPLETED_SUCCESS,
	payload: {...todo}
});

const markCompletedFailure = () => ({
	type: TODO_MARK_COMPLETED_FAILURE
});

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};