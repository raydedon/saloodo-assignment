import {
	CREATE_TODO_REQUEST,
	CREATE_TODO_SUCCESS,
	createTodo,
	createTodoSuccess,
	createTodoRequest,
	onAddTodoTextChange,
	fetchTodosRequest,
	fetchTodosSuccess,
	FETCH_TODOS_REQUEST,
	FETCH_TODOS_SUCCESS,
	fetchTodos
} from './add-todo';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import {ROOT_URL} from '../../utility';

describe('actions', () => {
	it('should create todo', () => {
		const text = 'Finish docs', id = '123', completed = false;
		const expectedAction = {
			type: 'CREATE_TODO_SUCCESS',
			payload: {id, text, completed}
		};
		expect(createTodoSuccess({
			_id: id,
			text,
			completed
		})).toEqual(expectedAction);
	});

	it('should create action of type CREATE_TODO_REQUEST when createTodoRequest action creater is called', () => {
		const expectedAction = {
			type: 'CREATE_TODO_REQUEST'
		};
		expect(createTodoRequest()).toEqual(expectedAction);
	});

	it('should create action of type ADD_TODO_INPUT_TEXT_CHANGE when onAddTodoTextChange action creater is called', () => {
		const expectedAction = {
			type: 'ADD_TODO_INPUT_TEXT_CHANGE',
			payload: {
				text: 'Hi'
			}
		};
		expect(onAddTodoTextChange('Hi')).toEqual(expectedAction);
	});

	it('should create action of type FETCH_TODOS_REQUEST when fetchTodosRequest action creater is called', () => {
		const expectedAction = {
			type: 'FETCH_TODOS_REQUEST'
		};
		expect(fetchTodosRequest()).toEqual(expectedAction);
	});

	it('should create action of type FETCH_TODOS_SUCCESS when fetchTodosSuccess action creater is called', () => {
		const expectedAction = {
			type: 'FETCH_TODOS_SUCCESS',
			payload: {
				list: []
			}
		};
		expect(fetchTodosSuccess([])).toEqual(expectedAction);
	});
});


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({todos: []});
describe('async actions', () => {
	afterEach(() => {
		fetchMock.reset();
		fetchMock.restore();
	});

	it('creates CREATE_TODO_SUCCESS when creating todo has been done', () => {
		fetchMock
			.postOnce(`${ROOT_URL}/todos`, {
				body: [{
					_id: '5b58addaaa0f9913ec128012',
					text: 'housing',
					completed: false,
					createdAt: '2018-07-25T17:05:30.101Z',
					updatedAt: '2018-07-25T17:05:30.101Z',
					__v: 0,
					id: '5b58addaaa0f9913ec128012'
				}],
				headers: {'content-type': 'application/json'}
			});


		const expectedActions = [
			{
				type: CREATE_TODO_REQUEST
			},
			{
				type: CREATE_TODO_SUCCESS,
				payload: {
					id: '5b58addaaa0f9913ec128012',
					text: 'housing',
					completed: false
				}
			}
		];

		store.dispatch(createTodo('housing')).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('creates FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS when fetchTodos action creater is called', () => {
		fetchMock
			.getOnce(`${ROOT_URL}/todos`, {
				body: [{
					_id: '5b58addaaa0f9913ec128012',
					text: 'housing',
					completed: true,
					createdAt: '2018-06-30T12:19:41.413Z',
					updatedAt: '2018-07-01T06:12:55.303Z',
					__v: 0,
					id: '5b58addaaa0f9913ec128012'
				}],
				headers: {'content-type': 'application/json'}
			});


		const expectedActions = [
			{
				type: FETCH_TODOS_REQUEST
			},
			{
				type: FETCH_TODOS_SUCCESS,
				payload: {
					id: '5b58addaaa0f9913ec128012',
					text: 'housing',
					completed: true
				}
			}
		];

		store.dispatch(fetchTodos()).then(() => {
			// return of async actions
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});