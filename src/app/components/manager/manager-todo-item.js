import React, {Component} from 'react';
import '../todo/todo.scss';
import SelectBox from '../todo/select';

export default class ManagerTodoItem extends Component {
	constructor(props) {
		super(props);

		this.markCompleted = this.markCompleted.bind(this);
	}

	markCompleted() {
		let {id, completed, markCompleted} = this.props;
		markCompleted(id, !completed);
	}

	render() {
		let {id, origin, destination, biker, status, desc} = this.props;
		return (
			<div className={`todo-item ${status}`}>
				<div className="column shipment-origin">{origin}</div>
				<div className="column shipment-dest">{destination}</div>
				<div className="column shipment-biker">
					<SelectBox shipmentId={id} biker={biker} />
				</div>
				<div className="column shipment-status">{status}</div>
				<div className="column shipment-desc">{desc}</div>
			</div>
		);
	}
}
