import {connect} from 'react-redux';
import TodoText from '../components/todo-text';
import {
	onEditTodoText, onCancelEditTodoText, onEditTodoTextChange, onSaveTodoText,
	deleteTodo
} from '../actions/todo-item';

const mapStateToProps = (state, ownProps) => ({
	id: ownProps.id,
	editTodoText: state.editTodoObj.text ? state.editTodoObj.text : '',
	text: ownProps.text,
	editActive: !!(state.editTodoObj && state.editTodoObj.id  && state.editTodoObj.id === ownProps.id),
	markCompleted: ownProps.markCompleted
});


const mapDispatchToProps = dispatch => ({
	onEditTodoTextChange: text => dispatch(onEditTodoTextChange(text)),
	onEditTodoText: (id, text) => dispatch(onEditTodoText(id, text)),
	onDeleteTodo: id => dispatch(deleteTodo(id)),
	onCancelEditTodoText: () => dispatch(onCancelEditTodoText()),
	onSaveTodoText: (id, text) => dispatch(onSaveTodoText(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoText);
