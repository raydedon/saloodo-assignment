import React, {Component} from 'react';
import {connect} from 'react-redux';
import './todo.scss';
import {updateBiker} from "../../actions/shipment.actions";

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
		let {origin, destination, biker, status, completed, desc} = this.props;
		return (
			<div className={`todo-item ${completed ? 'todo-completed' : 'todo-notcomplete'} list-unstyled`}>
				<div className="col shipment-origin">{origin}</div>
				<div className="col shipment-dest">{destination}</div>
				<div className="col shipment-biker">{biker && Object.keys(biker).length > 0 && biker.name}</div>
				<div className="col shipment-status">{status}</div>
				<div className="col shipment-desc">{desc}</div>
			</div>
		);
	}
}

const mapStateToProps = ({users}, ownProps) => ({users, ...ownProps});

const mapDispatchToProps = dispatch => ({
	updateBiker: (shipmentId, bikerId) => dispatch(updateBiker(shipmentId, bikerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
