import React, {Component} from 'react';
import './todo.scss';
import SelectBox from './select';

export default class Todo extends Component {
	constructor(props) {
		super(props);

		this.markCompleted = this.markCompleted.bind(this);
	}

	markCompleted() {
		let {id, completed, markCompleted} = this.props;
		markCompleted(id, !completed);
	}

	render() {
		let {id, origin, destination, biker, status, completed, desc} = this.props;
		return (
			<div className={`todo-item ${completed ? 'todo-completed' : 'todo-notcomplete'} list-unstyled`}>
				<div className="col shipment-origin">{origin}</div>
				<div className="col shipment-dest">{destination}</div>
				<div className="col shipment-biker">
					<SelectBox shipmentId={id} biker={biker} />
				</div>
				<div className="col shipment-status">{status}</div>
				<div className="col shipment-desc">{desc}</div>
			</div>
		);
	}
}
