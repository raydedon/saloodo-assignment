import React, {Component} from 'react';
import '../todo/todo.scss';
import {connect} from 'react-redux';
import {updateShipmentStatus} from '../../actions/shipment.actions';
import {ShipmentStatus} from '../../constants';

class BikerTodoItem extends Component {
	constructor(props) {
		super(props);

		this.markCompleted = this.markCompleted.bind(this);
	}

	markCompleted() {
		let {id, updateShipmentStatus, status: currentStatus} = this.props;
		switch(currentStatus) {
			case ShipmentStatus.SHIPMENT_STATUS_ASSIGNED: {
				updateShipmentStatus(id, ShipmentStatus.SHIPMENT_STATUS_PICKED_UP);
				break;
			}
			case ShipmentStatus.SHIPMENT_STATUS_PICKED_UP: {
				updateShipmentStatus(id, ShipmentStatus.SHIPMENT_STATUS_DELIVERED);
				break;
			}
			case ShipmentStatus.SHIPMENT_STATUS_DELIVERED: {
				return;
			}
			default: {
				updateShipmentStatus(id, ShipmentStatus.SHIPMENT_STATUS_ASSIGNED);
				break;
			}
		}
	}

	render() {
		let {origin, destination, status, completed, desc, biker} = this.props;
		return (
			<div className={`todo-item ${completed ? 'todo-completed' : 'todo-notcomplete'} list-unstyled`} onDoubleClick={this.markCompleted}>
				<div className="column shipment-origin">{origin}</div>
				<div className="column shipment-dest">{destination}</div>
				<div className="column shipment-status">{status}</div>
				<div className="column shipment-status">{biker && biker.name}</div>
				<div className="column shipment-desc">{desc}</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = dispatch => ({
	updateShipmentStatus: (shipmentId, status) => dispatch(updateShipmentStatus(shipmentId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BikerTodoItem);
