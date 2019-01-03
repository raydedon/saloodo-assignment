import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchShipments} from './actions/shipment.actions';
import TodoList from './components/todo/todo-list';

class HomePage extends React.Component {
	componentDidMount() {
		let {fetchShipments} = this.props;
		fetchShipments();
	}

	render() {
		const {user, users = [], shipments = []} = this.props;
		return (
			<div className="col-md-12">
				<h1>Hi {user.name}!</h1>
				<p>You're logged in with React & JWT!!</p>
				<h3>Users from secure api end point:</h3>
				{users.loading && <em>Loading users...</em>}
				{users.error && <span className="text-danger">ERROR: {users.error}</span>}
				{users.items && <ul>{users.items.map((user) => (<li key={user.id}>{`${user.name}`}</li>))}</ul>}
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
	fetchShipments: () => dispatch(fetchShipments())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
