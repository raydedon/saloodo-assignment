import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchShipments} from './actions/shipment.actions';
import TodoList from './components/todo/todo-list';
import {getAllUser} from "./actions";

class HomePage extends React.Component {
	componentDidMount() {
		let {fetchShipments, getAllUser} = this.props;
		fetchShipments();
		getAllUser();
	}

	render() {
		const {user, shipments = []} = this.props;
		return (
			<div className="col-md-12">
				<h1>Hi {user.name}!</h1>
				<TodoList list={shipments} />
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

const mapStateToProps = ({users = [], shipments = [], authentication: {user = {}}}) => ({user, shipments, users});

const mapDispatchToProps = dispatch => ({
	fetchShipments: () => dispatch(fetchShipments()),
	getAllUser: () => dispatch(getAllUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
