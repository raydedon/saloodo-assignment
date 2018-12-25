import addTodoText from './add-todo-text';

describe('test add todos text reducer', () => {
	it('should return the initial state of state when nothing is passed', () => {
		expect(addTodoText('', {})).toEqual('');
	});

	it('should handle ADD_TODO_INPUT_TEXT_CHANGE type of action', () => {
		expect(addTodoText('', {
			type: 'ADD_TODO_INPUT_TEXT_CHANGE',
			payload: {
				text: 'Hi'
			}
		})).toEqual('Hi');
	});
});
