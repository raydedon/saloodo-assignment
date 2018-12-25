import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../actions';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(userActions.getAll());
	}

	render() {
		const {user, users} = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.firstName}!</h1>
				<p>You're logged in with React & JWT!!</p>
				<h3>Users from secure api end point:</h3>
				{users.loading && <em>Loading users...</em>}
				{users.error && <span className="text-danger">ERROR: {users.error}</span>}
				{users.items &&
				<ul>
					{users.items.map((user) => (
						<li key={user.id}>
							{`${user.firstName} ${user.lastName}`}
						</li>
					))}
				</ul>
				}
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

const mapStateToProps = ({users, authentication: {user}}) => ({user, users});

export default connect(mapStateToProps, {})(HomePage);
