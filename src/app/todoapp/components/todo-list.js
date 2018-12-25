import React, {Component} from 'react';
import Todo from './todo';
import PropTypes from 'prop-types';

class TodoList extends Component {
	constructor(props) {
		super(props);

		this.renderListItems = this.renderListItems.bind(this);
	}

	renderListItems() {
		let {list, markCompleted} = this.props;
		return list.map((todo) => (
			<Todo completed={todo.completed}
			      markCompleted={markCompleted}
			      text={todo.text}
			      key={todo.id}
			      id={todo.id} />
		));
	}

	render() {
		return <ul>{this.renderListItems()}</ul>;
	}
}

TodoList.proptypes = {
	markCompleted: PropTypes.func.isRequired,
	list: PropTypes.bool.isRequired,
};

TodoList.defaultProps = {
	list: [],
};

export default TodoList;

