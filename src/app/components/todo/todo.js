import React, {Component} from 'react';
import './todo.scss';

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
			<div className={`todo-item ${completed ? 'todo-completed' : 'todo-notcomplete'} list-unstyled`}>{text}</div>
		);
	}
}


/*
const Todo = ({id, status, markDelivered}) => {
	return (
		<div className={`todo-item ${status === ShipmentStatus.SHIPMENT_STATUS_DELIVERED ? 'todo-delivered' : 'todo-notdelivered'} list-unstyled`}>
			<TodoTextCont text={text} id={id} markDelivered={this.markDelivered} />
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	markCompleted: (id, completed) => dispatch(markCompleted(id, completed))
});
*/

export default Todo;
