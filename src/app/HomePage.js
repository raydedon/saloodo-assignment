import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchShipments} from './actions/shipment.actions';
import TodoList from './components/todo/todo-list';
import {getAllUser} from './actions';
import BikerTodoItem from './components/biker/biker-todo-item';
import {ROLE_BIKER} from './constants';
import ManagerTodoItem from './components/manager/manager-todo-item';

class HomePage extends React.Component {
	componentDidMount() {
		let {fetchShipments, getAllBikers} = this.props;
		fetchShipments();
		getAllBikers();
	}

	render() {
		const {user, shipments = []} = this.props;
		console.info(user.role);
		return (
			<div className="col-md-12">
				<h1>Hi {user.name}!</h1>
				<TodoList list={shipments} itemComp={user.role === ROLE_BIKER ? BikerTodoItem : ManagerTodoItem} />
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
	getAllBikers: () => dispatch(getAllUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
