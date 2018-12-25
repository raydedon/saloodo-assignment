import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './todo.scss';
import TodoTextCont from '../containers/todo-text-cont';

class Todo extends Component {
	constructor(props) {
		super(props);

		this.markCompleted = this.markCompleted.bind(this);
	}

	markCompleted() {
		let {id, completed, markCompleted} = this.props;
		markCompleted(id, !completed);
	}

	render() {
		let {id, completed, text} = this.props;
		return (
			<li className={`todo-item ${completed ? 'todo-completed' : 'todo-notcomplete'} list-unstyled`}>
				<TodoTextCont text={text} id={id} markCompleted={this.markCompleted} />
			</li>
		);
	}
}

Todo.proptypes = {
	markCompleted: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

Todo.defaultProps = {
	completed: false,
	text: '',
};

export default Todo;
